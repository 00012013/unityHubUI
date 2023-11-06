import { RootRoute, Route, Router } from "@tanstack/react-router"
import App from "../App"
import Authors from "../pages/authors"
import Books from "../pages/books"
import { EditAuthorPage } from "../pages/edit-author"
import { EditBookPage } from "../pages/edit-book"
import Home from "../pages/home"
import { AddNewAuthorPage } from "../pages/new-author"
import { AddNewBookPage } from "../pages/new-book"
const rootRoute = new RootRoute({
    component: App,
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
})

const bookListPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/book",
    component: Books,
})

const authorListPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/author",
    component: Authors,
})

const addBookPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/add/book",
    component: AddNewBookPage,
})
const editBookPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/edit/book/$id",
    component: EditBookPage,
})

const addAuthorPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/add/author",
    component: AddNewAuthorPage,
})
const editAuthorPageRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/edit/author/$id",
    component: EditAuthorPage,
})
const routeTree = rootRoute.addChildren([
    indexRoute,
    bookListPageRoute,
    authorListPageRoute,
    addBookPageRoute,
    editBookPageRoute,
    addAuthorPageRoute,
    editAuthorPageRoute,
])

export const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}
