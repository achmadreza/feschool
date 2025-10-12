import { Outlet } from "react-router";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="flex w-full h-screen bg-gray-300">
      <div className="p-3">
        <Sidebar />
      </div>
      <main className="flex-1 p-3">
        <div className="w-full h-full bg-white rounded-lg p-5 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
