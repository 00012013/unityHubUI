import { ModeToggle } from "./ui/mode-toggle";

export function Header() {
  return (
      <header>
          <nav className="border-b px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <a href="https://flowbite.com" className="flex items-center">
                      <img
                          src="https://flowbite.com/docs/images/logo.svg"
                          className="mr-3 h-6 sm:h-9"
                          alt="Flowbite Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                          Unity Hub
                      </span>
                  </a>
                  <ModeToggle />
              </div>
          </nav>
      </header>
  )
}