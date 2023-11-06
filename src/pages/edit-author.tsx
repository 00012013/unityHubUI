import { AuthorForm } from "../components/author-form"

export function EditAuthorPage() {
  return (
      <AuthorForm
          editMode
          initialData={{
              age: 58,
              firstName: "John",
              lastName: "Nash",
              id: 1,
          }}
      />
  )
}
