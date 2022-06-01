import React from "react";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("./Navbar"), { ssr: false });

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;