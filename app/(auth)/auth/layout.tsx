import NavbarAuth from "@/components/NavbarAuth";
import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <div className="flex justify-center ">
        <NavbarAuth />
      </div>
      {children}
    </div>
  );
}
