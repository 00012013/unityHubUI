import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { EditIcon, TrashIcon } from "lucide-react"
import { Button, buttonVariants } from "../components/ui/button"
import { cn } from "../lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const authorColumns: ColumnDef<Author>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "firstName",
        header: "Name",
    },
    {
        accessorKey: "lastName",
        header: "Surname",
    },
    {
        accessorKey: "Actions",
        cell(props) {
            const queryClient = useQueryClient() // eslint-disable-line
            // eslint-disable-next-line
            const { mutate } = useMutation({
                mutationKey: ["books", "delete", props.row.original.id],
                mutationFn: async () => {
                    return axios.delete(
                        "http://localhost:5058/api/authors/" +
                            props.row.original.id
                    )
                },
                onSuccess() {
                    queryClient.invalidateQueries({ queryKey: ["authors"] })
                },
            })
            return (
                <div className="flex gap-6">
                    <Link
                        className={cn(
                            buttonVariants({ variant: "link", size: "icon" })
                        )}
                        to="/edit/author/$id"
                        params={{
                            id: "1",
                        }}
                    >
                        <EditIcon />
                    </Link>
                    <Button
                        onClick={() => mutate()}
                        variant="destructive"
                        size="icon"
                    >
                        <TrashIcon />
                    </Button>
                </div>
            )
        },
    },
]

export default authorColumns
