import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="flex flex-1 justify-center">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;