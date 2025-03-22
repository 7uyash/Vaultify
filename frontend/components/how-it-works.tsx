import { Upload, Lock, FolderTree, MessageSquareText, Share2 } from "lucide-react"

const steps = [
  {
    title: "Upload",
    description: "Upload your documents securely to DocCrypts",
    icon: Upload,
  },
  {
    title: "Secure",
    description: "Documents are encrypted and stored on the blockchain",
    icon: Lock,
  },
  {
    title: "Organize",
    description: "AI automatically categorizes your documents",
    icon: FolderTree,
  },
  {
    title: "Interact",
    description: "Ask questions and get insights from your documents",
    icon: MessageSquareText,
  },
  {
    title: "Share",
    description: "Securely share documents with granular access controls",
    icon: Share2,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-sky-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-600">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="text-gradient">Simple</span>, Secure Process
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              DocCrypts makes document management effortless with a streamlined workflow.
            </p>
          </div>
        </div>

        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* Modern step process with hexagons */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-sky-400 to-sky-500"></div>

          <div className="space-y-24 md:space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile view (stacked) */}
                <div className="md:hidden flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg border border-sky-100">
                    <step.icon className="h-8 w-8 text-sky-500" />
                  </div>
                  <div className="mt-4 text-center px-4">
                    <h3 className="text-2xl font-bold text-sky-900">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Desktop view (alternating) */}
                <div className="hidden md:flex items-center">
                  {/* Left content */}
                  <div
                    className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? "text-right pr-16" : "order-last text-left pl-16"}`}
                  >
                    <h3 className="text-2xl font-bold text-sky-900">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>

                  {/* Center icon */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-1 w-8 bg-sky-200"></div>
                    </div>
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg border border-sky-100 animate-in fade-in zoom-in duration-700">
                      <step.icon className="h-8 w-8 text-sky-500" />
                    </div>
                  </div>

                  {/* Right spacer */}
                  <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? "order-last" : ""}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

