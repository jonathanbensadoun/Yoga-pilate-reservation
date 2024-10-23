"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/utils/auth/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };
  return (
    <div className="flex items-center justify-center px-8 p-4 fixed w-screen md:w-1/2 rounded-b-3xl bg-gray-50 z-40 shadow ">
      <div>
        <h2 className="text-2xl">Réservation des cours de pilate</h2>
      </div>
      <form className="md:absolute md:right-10">
        <Button
          formAction={handleSignOut}
          disabled={isPending}
          className="flex gap-2"
        >
          Déconnexion
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </div>
  );
}
