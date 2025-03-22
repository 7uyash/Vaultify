import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Github, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <img 
                  src="/nav logo.png" 
                  alt="Project Logo" 
                  className="h-8 w-8 rounded-full"/>
              </div>
              <span className="font-bold text-xl">Vaultify</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Secure, intelligent document management powered by blockchain and AI.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-600 hover:bg-sky-50">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-600 hover:bg-sky-50">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-600 hover:bg-sky-50">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-sky-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-gray-500 hover:text-sky-600">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-500 hover:text-sky-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-sky-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-900">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4 text-sky-500" />
                <span>contact@Vaultify.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4 text-sky-500" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-sky-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-sky-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-500 hover:text-sky-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-sky-100 pt-8 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Vaultify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

