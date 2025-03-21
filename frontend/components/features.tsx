import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Brain, BellIcon as BrandTelegram, FolderKanban, Cloud } from "lucide-react"

const features = [
  {
    title: "Secure Storage",
    description: "Decentralized storage on IPFS and APTOS Blockchain ensures your documents are safe and tamper-proof.",
    icon: Shield,
  },
  {
    title: "AI Interaction",
    description: "Talk2Doc lets you ask questions about your documents and get instant answers.",
    icon: Brain,
  },
  {
    title: "Telegram Bot",
    description: "Manage your documents directly from Telegram with our AI bot.",
    icon: BrandTelegram,
  },
  {
    title: "Smart Organization",
    description: "Automatic categorization into Education, Finance, Legal, Personal, and Other.",
    icon: FolderKanban,
  },
  {
    title: "Seamless Integrations",
    description: "Sync with Google Drive and other cloud services with just one click.",
    icon: Cloud,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm dark:bg-blue-800">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Document Management</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              DocCrypts combines blockchain security with AI intelligence to revolutionize how you manage documents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-blue-50 dark:border-blue-900/50 transition-all hover:border-blue-100 dark:hover:border-blue-800/50 hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <feature.icon className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

