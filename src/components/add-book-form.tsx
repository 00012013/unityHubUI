import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface BookFormProps {
    editMode?: boolean
    initialData?: Book | object
}

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    published_year: z.string().transform((v) => +v),
    author: z.string(),
})

export function BookForm({ editMode, initialData }: BookFormProps) {
    // ...
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ["books", "new"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            if (editMode) {
                return await axios.post(
                    "http://localhost:5058/api/books",
                    values
                )
            } else {
                return await axios.put(
                    "http://localhost:5058/api/books/" +
                        (initialData as Book).id,
                    values
                )
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["books"] })
        },
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...(initialData as object),
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutate(values)
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full mr-8 pt-8"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Pride and prejudice"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your book's title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="published_year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Published year</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="2005"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your book's published year.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the author" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="John Doe">
                                        John Doe
                                    </SelectItem>
                                    <SelectItem value="John Nash">
                                        John Nash
                                    </SelectItem>
                                    <SelectItem value="Susan Doe">
                                        Susan Doe
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {isPending && "Submitting..."}
                    {!isPending && "Submit"}
                </Button>
            </form>
        </Form>
    )
}
