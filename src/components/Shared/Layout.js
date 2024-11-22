import React from "react";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 fixed h-full">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
