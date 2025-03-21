import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "DocCrypts has transformed how our team manages sensitive documents. The AI features are incredibly useful.",
    name: "Sarah Johnson",
    title: "CTO, TechInnovate",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "SJ",
  },
  {
    quote:
      "The blockchain security gives us peace of mind, and the Telegram integration makes it so convenient to use.",
    name: "Michael Chen",
    title: "Legal Director, LawFirst",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "MC",
  },
  {
    quote: "We've reduced document processing time by 60% since implementing DocCrypts across our organization.",
    name: "Elena Rodriguez",
    title: "Operations Manager, GlobalFinance",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "ER",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Professionals</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              See what our users are saying about DocCrypts.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-800 border-none shadow-md animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-blue-500 mb-4 opacity-50" />
                <p className="mb-6 text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

