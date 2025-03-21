import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

const featuredPrompts = [
  {
    id: 1,
    title: "Creative Story Generator",
    description: "Generate engaging short stories with complex characters and plot twists.",
    price: "0.1 ETH",
    category: "Creative Writing",
    rating: 4.8,
  },
  {
    id: 2,
    title: "SEO Content Optimizer",
    description: "Create SEO-optimized content that ranks well on search engines.",
    price: "0.08 ETH",
    category: "Marketing",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Code Refactoring Assistant",
    description: "Improve your code quality with smart refactoring suggestions.",
    price: "0.15 ETH",
    category: "Programming",
    rating: 4.7,
  },
]

export function FeaturedPrompts() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Prompts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrompts.map((prompt) => (
            <Card key={prompt.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{prompt.title}</CardTitle>
                    <CardDescription className="mt-2">{prompt.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-yellow-500">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{prompt.rating}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">{prompt.price}</span>
                <Button>Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

