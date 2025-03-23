const TelegramBot = require('node-telegram-bot-api');
const { ethers } = require('ethers');
const axios = require('axios');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const stream = require('stream');
const { promisify } = require('util');
const crypto = require('crypto');
const Tesseract = require('tesseract.js');
const { google } = require('googleapis');
const aptos = require('aptos');
const pdf = require('pdf-poppler'); // For PDF to image conversion
const path = require('path');
require('dotenv').config();

const pipeline = promisify(stream.pipeline);

// Load environment variablesd
//df
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Store user sessions (wallet address + session ID + documents)
const users = {};

// Connect to Ethereum Mainnet using Alchemy's RPC endpoint
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

// Initialize Pinata with your API Key and Secret
const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_KEY });

// Initialize Aptos client
const aptosClient = new aptos.AptosClient('https://fullnode.devnet.aptoslabs.com');

// Initialize Google Drive OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Pre-funded Ethereum address for testing
const preFundedAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Vaultify! Please connect your wallet using /connect.');
});

// Connect wallet command
bot.onText(/\/connect/, async (msg) => {
  const chatId = msg.chat.id;

  // Simulate wallet connection (for demo purposes)
  const wallet = ethers.Wallet.createRandom(); // Create a random wallet for demo
  const address = wallet.address;
  const privateKey = wallet.privateKey; // Get the private key

  // Generate a unique session ID
  const sessionId = Math.random().toString(36).substring(7);
  users[chatId] = { address, sessionId, privateKey }; // Store private key in the session

  console.log('User connected:', users[chatId]); // Debugging
  bot.sendMessage(chatId, `Wallet connected! Your session ID: ${sessionId}`);
});

// Connect Google Drive command
bot.onText(/\/connectgoogle/, async (msg) => {
  const chatId = msg.chat.id;

  // Generate Google Drive OAuth2 URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  bot.sendMessage(chatId, `Connect your Google Drive: ${authUrl}`);
});

// Handle Google Drive OAuth2 callback
bot.onText(/\/googlecallback (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1];

  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Store tokens in user session
    users[chatId].googleTokens = tokens;

    bot.sendMessage(chatId, 'Google Drive connected successfully!');
  } catch (error) {
    console.error('Error connecting Google Drive:', error);
    bot.sendMessage(chatId, 'Failed to connect Google Drive. Please try again.');
  }
});

// Upload document command
bot.on('document', async (msg) => {
  const chatId = msg.chat.id;

  // Check if the user has connected their wallet
  if (!users[chatId]) {
    bot.sendMessage(chatId, 'Please connect your wallet using /connect before uploading documents.');
    return;
  }

  const fileId = msg.document.file_id;
  const file = await bot.getFile(fileId);
  const fileStream = await bot.getFileStream(fileId);

  // Create a temporary file to store the stream
  const tempFilePath = `./temp_${fileId}${path.extname(file.file_path)}`;
  const writeStream = fs.createWriteStream(tempFilePath);

  await pipeline(fileStream, writeStream);

  // Generate a secret key for the user
  const secretKey = generateSecretKey(users[chatId].sessionId);

  // Encrypt the file data
  const fileData = fs.readFileSync(tempFilePath);
  const { iv, encryptedData } = encryptData(fileData, secretKey);

  // Write the encrypted data to a temporary file
  const encryptedFilePath = `./encrypted_${fileId}.tmp`;
  fs.writeFileSync(encryptedFilePath, Buffer.from(encryptedData, 'hex'));

  // Upload the encrypted file to IPFS
  const cid = await uploadToIPFS(encryptedFilePath, msg.document.file_name);

  // Extract text from the document using OCR
  const extractedText = await extractTextFromDocument(tempFilePath);

  // Categorize the document
  const category = await categorizeDocument(extractedText);

  // Store CID, IV, extracted text, and category in user session
  users[chatId].documents = users[chatId].documents || [];
  users[chatId].documents.push({ cid, name: msg.document.file_name, iv, text: extractedText, category });

  // Clean up the temporary files
  fs.unlinkSync(tempFilePath);
  fs.unlinkSync(encryptedFilePath);

  bot.sendMessage(chatId, `Document uploaded and encrypted! CID: ${cid}\nCategory: ${category}`);
});

// Retrieve document command
bot.onText(/\/retrieve (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const cid = match[1];

  // Find the document in the user's session
  const document = users[chatId].documents.find(doc => doc.cid === cid);
  if (document) {
    try {
      // Fetch the encrypted file from IPFS using the CID
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

      // Generate the secret key for the user
      const secretKey = generateSecretKey(users[chatId].sessionId);

      // Decrypt the file data
      const decryptedData = decryptData(response.data.toString('hex'), secretKey, document.iv);

      // Send the decrypted file back to the user
      bot.sendDocument(chatId, decryptedData, { caption: `Retrieved document: ${document.name}` });
    } catch (error) {
      console.error('Error fetching or decrypting file:', error);
      bot.sendMessage(chatId, 'Failed to retrieve the document. Please try again.');
    }
  } else {
    bot.sendMessage(chatId, 'Document not found!');
  }
});

// Talk2Doc: Ask questions about your documents
bot.onText(/\/askdoc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

  // Check if the user has uploaded any documents
  if (!users[chatId]?.documents?.length) {
    bot.sendMessage(chatId, 'You have not uploaded any documents yet. Please upload a document first.');
    return;
  }

  // Use the text from the most recently uploaded document
  const documentText = users[chatId].documents[users[chatId].documents.length - 1].text;

  // Use Hugging Face's Question Answering API to find the answer
  const answer = await askQuestionAboutDocument(question, documentText);

  bot.sendMessage(chatId, `Answer: ${answer}`);
});

// Digital Signatures
bot.onText(/\/sign (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const document = match[1]; // CID or document content

  // Check if the user has connected their wallet
  if (!users[chatId]?.privateKey) {
    bot.sendMessage(chatId, 'Please connect your wallet using /connect before signing documents.');
    return;
  }

  // Generate a digital signature
  const privateKey = users[chatId].privateKey; // Retrieve private key from the session
  const signature = signDocument(document, privateKey);

  bot.sendMessage(chatId, `Signature: ${signature}`);
});

// Access Control Management
bot.onText(/\/grantaccess (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [walletAddress, documentId] = match[1].split(' ');

  // Grant access on-chain using Aptos
  await grantAccess(walletAddress, documentId);

  bot.sendMessage(chatId, `Access granted to ${walletAddress} for document ${documentId}`);
});

// On-Chain AI Agent
bot.onText(/\/sharewithagent (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [agentAddress, documentIds] = match[1].split(' ');

  // Share documents with the AI agent on-chain
  await shareDocuments(agentAddress, documentIds.split(','));

  bot.sendMessage(chatId, `Documents shared with agent ${agentAddress}`);
});

// Helper function to upload to IPFS using Pinata
async function uploadToIPFS(filePath, fileName) {
  try {
    // Create a readable stream from the file
    const fileStream = fs.createReadStream(filePath);

    // Upload the file to IPFS
    const result = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: {
        name: fileName,
      },
    });
    return result.IpfsHash; // Returns the CID
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

// Function to convert PDF to images
async function convertPdfToImages(pdfPath, outputDir) {
  const opts = {
    format: 'jpeg', // Output format
    out_dir: outputDir, // Output directory
    out_prefix: 'page', // Output file prefix
    page: null, // Convert all pages
  };

  await pdf.convert(pdfPath, opts);
  const imageFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.jpeg'));
  return imageFiles.map(file => path.join(outputDir, file));
}

// Function to extract text from a document (PDF or image)
async function extractTextFromDocument(filePath) {
  try {
    if (filePath.endsWith('.pdf')) {
      // Convert PDF to images
      const outputDir = path.dirname(filePath);
      const imageFiles = await convertPdfToImages(filePath, outputDir);

      let fullText = '';
      for (const imageFile of imageFiles) {
        const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
        fullText += text + '\n';
      }

      // Clean up temporary images
      for (const imageFile of imageFiles) {
        fs.unlinkSync(imageFile);
      }

      return fullText.trim(); // Ensure the text is trimmed
    } else {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      return text.trim(); // Ensure the text is trimmed
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    return ''; // Return an empty string if extraction fails
  }
}

// Function to categorize a document using Hugging Face's Text Classification API
async function categorizeDocument(text) {
  if (!text || text.trim().length === 0) {
    return 'Uncategorized'; // Return a default category if the text is empty
  }

  const model = 'distilbert-base-uncased';
  const url = `https://api-inference.huggingface.co/models/${model}`;

  try {
    const response = await axios.post(
      url,
      { inputs: text }, // Ensure the input is a valid string
      { headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` } }
    );

    // Map the model's output to predefined categories
    const categories = ['Education', 'Finance', 'Personal', 'Legal'];
    const label = response.data[0]?.label || 0; // Default to the first category if no label is returned
    return categories[label];
  } catch (error) {
    console.error('Error categorizing document:', error);
    return 'Uncategorized'; // Return a default category in case of an error
  }
}

// Function to ask a question about a document using Hugging Face's Question Answering API
async function askQuestionAboutDocument(question, context) {
  if (!context || context.trim().length === 0) {
    return 'No context provided to answer the question.';
  }

  const model = 'deepset/roberta-base-squad2';
  const url = `https://api-inference.huggingface.co/models/${model}`;

  try {
    const response = await axios.post(
      url,
      { inputs: { question, context } },
      { headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` } }
    );
    return response.data.answer || 'No answer found.';
  } catch (error) {
    console.error('Error asking question:', error);
    return 'Failed to process the question. Please try again.';
  }
}

// Function to sign a document using a private key
function signDocument(document, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(document);
  return sign.sign(privateKey, 'hex');
}

// Function to grant access on-chain using Aptos
async function grantAccess(walletAddress, documentId) {
  const payload = {
    function: '0x1::access_control::grant_access',
    type_arguments: [],
    arguments: [walletAddress, documentId],
  };
  await aptosClient.submitTransaction(payload);
}

// Function to share documents with an AI agent on-chain
async function shareDocuments(agentAddress, documentIds) {
  const payload = {
    function: '0x1::ai_agent::share_documents',
    type_arguments: [],
    arguments: [agentAddress, documentIds],
  };
  await aptosClient.submitTransaction(payload);
}

// Function to encrypt data using AES-256-CBC
function encryptData(data, key) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Function to decrypt data using AES-256-CBC
function decryptData(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}

// Generate a secret key for the user (based on session ID or wallet address)
function generateSecretKey(sessionId) {
  return crypto.createHash('sha256').update(sessionId).digest('hex').substring(0, 32); // 32 bytes for AES-256
}

// Fetch balance of the pre-funded address (for testing)
async function fetchBalance() {
  const balance = await provider.getBalance(preFundedAddress);
  console.log('Balance of pre-funded address:', ethers.formatEther(balance), 'ETH');
}

fetchBalance(); // Test the connection