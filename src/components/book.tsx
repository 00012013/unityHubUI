import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

export function BookComponent(book: Book) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Title: {book.author?.firstName}</li>
                    <li>Published year: {book.publishYear}</li>
                </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Add to card</Button>
            </CardFooter>
        </Card>
    )
}
