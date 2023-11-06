import { BookForm } from "../components/add-book-form"

export function EditBookPage() {
  return <BookForm editMode initialData={{
    id: 1, publishYear: 2005, title: "John nash", author: {
      age: 58,
      firstName: "John",
      lastName: "Nash",
      id: 1,
    }}} />
}
