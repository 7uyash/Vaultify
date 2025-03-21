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
    <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Secure Process</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Vaultify makes document management effortless with a streamlined workflow.
            </p>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24 max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-600 to-green-500 hidden md:block"></div>

          <div className="space-y-16 md:space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile view (stacked) */}
                <div className="md:hidden flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 text-center px-4">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>

                {/* Desktop view (alternating) */}
                <div className="hidden md:grid md:grid-cols-5 md:items-center">
                  {/* Left content */}
                  <div className={`col-span-2 ${index % 2 === 0 ? "text-right pr-8" : "col-start-4 text-left pl-8"}`}>
                    {index % 2 === 0 && (
                      <>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{step.description}</p>
                      </>
                    )}
                  </div>

                  {/* Center icon */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg animate-in fade-in zoom-in duration-700">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={`col-span-2 ${index % 2 === 0 ? "col-start-4 text-left pl-8" : "text-right pr-8"}`}>
                    {index % 2 !== 0 && (
                      <>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{step.description}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

