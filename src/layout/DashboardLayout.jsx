import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex gap-3">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1 md:ml-64 bg-[#f0f0f0]  md:rounded-l-3xl">
        <div className="p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
