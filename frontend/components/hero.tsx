import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50">
      {/* Spotlight effect */}
      <div className="spotlight"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl floating-delay-2"></div>

        {/* Document icons */}
        <div className="absolute top-1/3 right-[15%] w-16 h-20 bg-white rounded-lg shadow-lg p-2 floating-delay-1">
          <div className="w-full h-3 bg-sky-200 rounded mb-2"></div>
          <div className="w-3/4 h-2 bg-sky-100 rounded mb-2"></div>
          <div className="w-full h-2 bg-sky-100 rounded mb-2"></div>
          <div className="w-2/3 h-2 bg-sky-100 rounded"></div>
        </div>

        <div className="absolute bottom-1/3 left-[20%] w-14 h-18 bg-white rounded-lg shadow-lg p-2 floating-delay-3">
          <div className="w-full h-3 bg-sky-200 rounded mb-2"></div>
          <div className="w-full h-2 bg-sky-100 rounded mb-2"></div>
          <div className="w-2/3 h-2 bg-sky-100 rounded"></div>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M20,30 Q50,20 80,40" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="0.5" fill="none" />
          <path d="M30,70 Q50,80 70,60" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="0.5" fill="none" />
          <path d="M10,50 Q50,40 90,50" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-gradient">Vaultify:</span> Secure, Smart Document Management
          </h1>
          <p
            className="mt-6 text-lg leading-8 text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "100ms" }}
          >
            Leverage AI and blockchain for unparalleled document security and intelligence. Store, organize, and
            interact with your documents in a revolutionary way.
          </p>
          <div
            className="mt-10 flex items-center justify-center gap-x-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "200ms" }}
          >
            <Button size="lg" className="rounded-full bg-sky-500 hover:bg-sky-600 text-white px-8">
              Try Vaultify Free
            </Button>
            <Link href="#features" className="flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700">
              Learn more <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

