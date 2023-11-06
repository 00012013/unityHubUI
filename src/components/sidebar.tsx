import { Link } from "@tanstack/react-router";
import { BookAIcon, User } from "lucide-react";
export function Sidebar() {
  return (
      <aside
          id="default-sidebar"
          className="fixed lg:relative top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-background"
          aria-label="Sidenav"
      >
          <div className="overflow-y-auto py-5 px-3 h-full border-r">
              <ul className="space-y-2">
                  <li>
                      <Link
                          activeProps={{
                              className: "bg-foreground text-background",
                          }}
                          to="/book"
                          className="flex items-center p-2 text-base font-normal rounded-lg group hover:bg-foreground hover:text-background"
                      >
                          <BookAIcon />
                          <span className="ml-3">Books</span>
                      </Link>
                  </li>
                  <li>
                      <Link
                          activeProps={{
                              className: "bg-foreground text-background",
                          }}
                          to="/author"
                          className="flex items-center p-2 text-base font-normal rounded-lg group hover:bg-foreground hover:text-background"
                      >
                          <User />
                          <span className="ml-3">Authors</span>
                      </Link>
                  </li>
              </ul>
          </div>
      </aside>
  )
}