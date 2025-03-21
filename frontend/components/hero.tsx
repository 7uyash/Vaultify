import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with blockchain nodes and AI circuits illustration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </pattern>
              <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(74, 222, 128, 0.3)" />
                <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Blockchain nodes */}
            <circle cx="200" cy="200" r="8" fill="url(#dotGradient)" />
            <circle cx="400" cy="300" r="8" fill="url(#dotGradient)" />
            <circle cx="600" cy="200" r="8" fill="url(#dotGradient)" />
            <circle cx="300" cy="500" r="8" fill="url(#dotGradient)" />
            <circle cx="500" cy="400" r="8" fill="url(#dotGradient)" />
            <circle cx="700" cy="600" r="8" fill="url(#dotGradient)" />
            {/* Connection lines */}
            <line x1="200" y1="200" x2="400" y2="300" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
            <line x1="400" y1="300" x2="600" y2="200" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
            <line x1="400" y1="300" x2="300" y2="500" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
            <line x1="300" y1="500" x2="500" y2="400" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
            <line x1="500" y1="400" x2="700" y2="600" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
            <line x1="600" y1="200" x2="500" y2="400" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            DocCrypts: Secure, Smart Document Management
          </h1>
          <p
            className="mt-6 text-lg leading-8 text-gray-300 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "100ms" }}
          >
            Leverage AI and blockchain for unparalleled document security and intelligence. Store, organize, and
            interact with your documents in a revolutionary way.
          </p>
          <div
            className="mt-10 flex items-center justify-center gap-x-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8"
            >
              Try DocCrypts Free
            </Button>
            <Link href="#features" className="flex items-center text-sm font-semibold text-white">
              Learn more <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

