import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
export function AuthorComponent(author: Author) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{author.firstName}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Age: {author.age}</li>
                    <li>
                        Full name: {author.firstName} {author.lastName}
                    </li>
                    <li>Total books: {author?.books?.length}</li>
                </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">
                    <Heart />
                </Button>
            </CardFooter>
        </Card>
    )
}
