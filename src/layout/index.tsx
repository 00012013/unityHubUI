import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

export function RootLayout() {
  return (
      <>
          <Header />
          <div className="flex gap-8 items-start">
              <Sidebar />
              <Outlet />
          </div>
      </>
  )
}