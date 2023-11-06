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
import { useRouter } from "@tanstack/react-router";
import { API_URL } from "../consts";

interface AuthorFormProps {
    editMode?: boolean
    initialData?: Author | object
}

const formSchema = z.object({
    firstName: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    lastName: z.string(),
    age: z.string().transform((v) => +v),
})

export function AuthorForm({ editMode, initialData }: AuthorFormProps) {
    // ...
    const queryClient = useQueryClient()
    const arr = window.location.pathname.split("/")
    const id = arr[arr.length - 1];
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationKey: ["books", "new"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            if (!editMode) {
                return await axios.post(
                    `${API_URL}/api/authors`,
                    values
                )
            } else {
                return await axios.put(
                    `${API_URL}/api/authors/` +
                        id,
                    values
                )
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["authors"] })
            router.navigate({to:"/author"});
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
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name </FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>
                                First name of the author.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name </FormLabel>
                            <FormControl>
                                <Input placeholder="Nash" {...field} />
                            </FormControl>
                            <FormDescription>
                                Last name of the author.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="51"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Age of the author</FormDescription>
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
