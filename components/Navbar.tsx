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
    <div className="flex justify-between items-center px-8 p-4 fixed w-screen bg-gray-100">
      <div>
        <h2 className="text-2xl">Réservation des cours de pilate</h2>
      </div>
      <form>
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
