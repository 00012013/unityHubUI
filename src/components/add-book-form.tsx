import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
import {  useRouter } from "@tanstack/react-router";
import { API_URL } from "../consts";

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
    const router = useRouter();
    const {data:authors} = useQuery({
        queryKey:["authors"],
        queryFn: async () => {
            return (await axios.get(`${API_URL}/api/authors`))
                .data as Author[]
        },
    })
    const arr = window.location.pathname.split("/")
    const id = arr[arr.length - 1];
    const { mutate, isPending } = useMutation({
        mutationKey: ["books", "new"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            if (!editMode) {
                return await axios.post(
                    `${API_URL}/api/books`,
                    {
                        title: values.title,
                        publishYear: String(values.published_year),
                        authorId: 2

                        // "title": "sadsaas",
                        // "publishYear": "string",
                        // "authorId": 2
                    }
                )
            } else {
                return await axios.put(
                    `${API_URL}/api/books/` +
                    id,
                        {
                            title: values.title,
                            publishYear: String(values.published_year),
                            authorId: 2
                            
                            // "title": "sadsaas",
                            // "publishYear": "string",
                            // "authorId": 2
                        }
                )
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["books"] })
            router.navigate({to:"/book"});
        },
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...(initialData as object),
        },
    })
    console.log(form.formState.errors);
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
                                   {authors?.map(author => (
                                    <SelectItem value={String(author.id)}>
                                        {author.firstName} {author.lastName}
                                    </SelectItem>
                                   ))}
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
