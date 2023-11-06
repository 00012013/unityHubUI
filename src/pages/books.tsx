import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import axios from "axios"
import bookColumns from "../columns/book"
import { DataTable } from "../components/data-table"
import { buttonVariants } from "../components/ui/button"
import { cn } from "../lib/utils"

export default function Books() {
    // const books: Book[] = [
    //     {
    //         id: 1,
    //         title: "Book 1",
    //         publishYear: "2000",
    //         author: {
    //             age: 25,
    //             firstName: "John",
    //             id: 1,
    //             lastName:"Doe"
    //         }
    //     }
    // ]
    const { data: books } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return (await axios.get("http://localhost:5058/api/books"))
                .data as Book[]
        },
    })
    return (
        // <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] py-8">
        //     {books.map(book => (
        //         <BookComponent key={book.id} {...book} />
        //     ))}
        // </ul>
        <DataTable columns={bookColumns} data={books! || []}>
            <Link
                to="/add/book"
                className={cn(
                    buttonVariants({ variant: "destructive", size: "sm" })
                )}
            >
                Add new
            </Link>
        </DataTable>
    )
}
// // class Author
// //     {
// //         public int Id { get; set; }
// //         public string FirstName { get; set; }

// //         public string LastName { get; set; }

// //         public int Age { get; set; }

// //         public ICollection<Book> Books { get; set; }
//     }
