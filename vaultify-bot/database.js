const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('./vaultify.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Create the 'documents' table if it doesn't exist
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chatId TEXT NOT NULL,
      fileName TEXT NOT NULL,
      cid TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Documents table ready');
    }
  });
}

// Insert a new document into the database
function insertDocument(chatId, fileName, cid) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO documents (chatId, fileName, cid) VALUES (?, ?, ?)`,
      [chatId, fileName, cid],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Return the ID of the inserted row
        }
      }
    );
  });
}

// Retrieve documents for a specific user (chatId)
function getDocumentsByChatId(chatId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM documents WHERE chatId = ?`,
      [chatId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

// Retrieve a specific document by CID
function getDocumentByCid(cid) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM documents WHERE cid = ?`,
      [cid],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

module.exports = { insertDocument, getDocumentsByChatId, getDocumentByCid };