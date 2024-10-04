import Navbar from "@/components/Navbar";
import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
