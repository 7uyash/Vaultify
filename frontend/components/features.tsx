import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Brain, BellIcon as BrandTelegram, FolderKanban, Cloud } from "lucide-react"

const features = [
  {
    title: "Secure Storage",
    description: "Decentralized storage on IPFS and APTOS Blockchain ensures your documents are safe and tamper-proof.",
    icon: Shield,
    centerIcon: true,
  },
  {
    title: "AI Interaction",
    description: "Talk2Doc lets you ask questions about your documents and get instant answers.",
    icon: Brain,
    centerIcon: true,
  },
  {
    title: "Telegram Bot",
    description: "Manage your documents directly from Telegram with our AI bot.",
    icon: BrandTelegram,
    centerIcon: false,
  },
  {
    title: "Smart Organization",
    description: "Automatic categorization into Education, Finance, Legal, Personal, and Other.",
    icon: FolderKanban,
    centerIcon: false,
  },
  {
    title: "Seamless Integrations",
    description: "Sync with Google Drive and other cloud services with just one click.",
    icon: Cloud,
    centerIcon: false,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-600">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="text-gradient">Powerful</span> Document Management
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              DocCrypts combines blockchain security with AI intelligence to revolutionize how you manage documents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover border border-sky-100 bg-white animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`flex items-center ${feature.centerIcon ? "justify-center" : "gap-4"}`}>
                  {!feature.centerIcon && (
                    <div className="rounded-full bg-sky-100 p-2.5">
                      <feature.icon className="h-6 w-6 text-sky-600" />
                    </div>
                  )}
                  <CardTitle className={`text-sky-900 ${feature.centerIcon ? "text-center mb-3" : ""}`}>
                    {feature.title}
                  </CardTitle>
                </div>
                {feature.centerIcon && (
                  <div className="flex justify-center mt-2">
                    <div className="rounded-full bg-sky-100 p-3">
                      <feature.icon className="h-8 w-8 text-sky-600" />
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

