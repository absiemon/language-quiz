import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function () {
  return (
    <div className="px-4 flex flex-col min-h-screen bg-emerald-100">
      <Header />
      <Outlet />
    </div>
  );
}
