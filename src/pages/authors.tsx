import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import axios from "axios"
import authorColumns from "../columns/author"
import { DataTable } from "../components/data-table"
import { buttonVariants } from "../components/ui/button"
import { cn } from "../lib/utils"
import { API_URL } from "../consts"

export default function Authors() {
    const { data: authors } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return (await axios.get(`${API_URL}/api/authors`))
                .data as Author[]
        },
    })
    return (
        <DataTable columns={authorColumns} data={authors || []}>
            <Link
                to="/add/author"
                className={cn(
                    buttonVariants({ variant: "destructive", size: "sm" })
                )}
            >
                Add new
            </Link>
        </DataTable>
    )
}
