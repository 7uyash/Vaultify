"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
            </div>
          </div>
          <span className="font-bold text-xl">DocCrypts</span>
        </Link>
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-6 text-sm font-medium">
          <Link href="#features" className="transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-primary">
            How It Works
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="#contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:flex"
            onClick={() => document.getElementById("wallet-modal")?.classList.remove("hidden")}
          >
            Log In
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            Join the Waitlist
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#features" className="text-lg font-medium hover:text-primary">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-lg font-medium hover:text-primary">
                  How It Works
                </Link>
                <Link href="#pricing" className="text-lg font-medium hover:text-primary">
                  Pricing
                </Link>
                <Link href="#contact" className="text-lg font-medium hover:text-primary">
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    Join the Waitlist
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Wallet Connection Modal */}
      <div
        id="wallet-modal"
        className="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById("wallet-modal")?.classList.add("hidden")
          }
        }}
      >
        <div
          className="bg-background border rounded-lg shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold mb-4">Connect Your Wallet</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>MetaMask</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.8089 1L13.4298 7.95417L15.0899 3.91306L21.8089 1Z"
                  fill="#E17726"
                  stroke="#E17726"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.19135 1L10.5 8.01611L8.91012 3.91306L2.19135 1Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.6741 17.1562L16.3901 21.0331L21.3248 22.5135L22.7666 17.2284L18.6741 17.1562Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.24365 17.2284L2.67511 22.5135L7.60977 21.0331L5.32578 17.1562L1.24365 17.2284Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.31921 10.6975L5.90808 12.9909L10.7825 13.2278L10.6 8.01611L7.31921 10.6975Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.6809 10.6975L13.3397 7.95417L13.2175 13.2278L18.0919 12.9909L16.6809 10.6975Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.60977 21.0331L10.4797 19.4702L8.01501 17.2592L7.60977 21.0331Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5203 19.4702L16.3903 21.0331L15.985 17.2592L13.5203 19.4702Z"
                  fill="#E27625"
                  stroke="#E27625"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>WalletConnect</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.08 9.24C9.6 5.68 15.36 5.68 18.88 9.24L19.28 9.64C19.52 9.84 19.52 10.2 19.28 10.44L17.84 11.88C17.72 12 17.52 12 17.4 11.88L16.8 11.28C14.32 8.8 10.64 8.8 8.16 11.28L7.52 11.92C7.4 12.04 7.2 12.04 7.08 11.92L5.64 10.48C5.4 10.24 5.4 9.88 5.64 9.68L6.08 9.24ZM21.76 12.12L23 13.36C23.24 13.6 23.24 13.96 23 14.16L17.4 19.8C17.16 20.04 16.8 20.04 16.6 19.8L12.84 16.04C12.8 16 12.72 16 12.68 16.04L8.92 19.8C8.68 20.04 8.32 20.04 8.12 19.8L2.48 14.16C2.24 13.92 2.24 13.56 2.48 13.36L3.72 12.12C3.96 11.88 4.32 11.88 4.52 12.12L8.28 15.88C8.32 15.92 8.4 15.92 8.44 15.88L12.2 12.12C12.44 11.88 12.8 11.88 13 12.12L16.76 15.88C16.8 15.92 16.88 15.92 16.92 15.88L20.68 12.12C20.96 11.88 21.32 11.88 21.76 12.12Z"
                  fill="#3B99FC"
                />
              </svg>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>Coinbase Wallet</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 1C5.9249 1 1 5.9249 1 12C1 18.0751 5.9249 23 12 23C18.0751 23 23 18.0751 23 12C23 5.9249 18.0751 1 12 1Z"
                  fill="#0052FF"
                />
                <path
                  d="M12.0001 5.25C8.27208 5.25 5.25 8.27208 5.25 12.0001C5.25 15.7281 8.27208 18.7502 12.0001 18.7502C15.7281 18.7502 18.7502 15.7281 18.7502 12.0001C18.7502 8.27208 15.7281 5.25 12.0001 5.25ZM14.9684 14.9684H9.03174V9.03174H14.9684V14.9684Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="ghost" onClick={() => document.getElementById("wallet-modal")?.classList.add("hidden")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

