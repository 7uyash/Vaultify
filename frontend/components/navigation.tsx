"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navigation() {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">PromptMarket</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/browse" className="transition-colors hover:text-foreground/80 text-foreground">
              Browse
            </Link>
            <Link href="/sell" className="transition-colors hover:text-foreground/80 text-foreground">
              Sell
            </Link>
            <Link href="/governance" className="transition-colors hover:text-foreground/80 text-foreground">
              Governance
            </Link>
            <Link href="/profile" className="transition-colors hover:text-foreground/80 text-foreground">
              Profile
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-6 px-2 py-6">
              <Link href="/browse" className="hover:text-foreground/80">
                Browse
              </Link>
              <Link href="/sell" className="hover:text-foreground/80">
                Sell
              </Link>
              <Link href="/governance" className="hover:text-foreground/80">
                Governance
              </Link>
              <Link href="/profile" className="hover:text-foreground/80">
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search prompts..." className="pl-8 md:w-[300px] lg:w-[400px]" />
            </div>
          </div>
          <Button variant="outline" className="ml-auto hidden md:flex" onClick={() => setIsConnected(!isConnected)}>
            <Wallet className="mr-2 h-4 w-4" />
            {isConnected ? "0x1234...5678" : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  )
}

