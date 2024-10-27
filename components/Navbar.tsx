"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/utils/auth/action";
import { AiOutlineHome, AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };
  const handleHomeRedirect = () => {
    startTransition(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="flex items-center justify-center px-8 p-4 fixed w-screen lg:w-2/3 xl:w-1/2 rounded-b-3xl bg-gray-50 z-40 shadow ">
      <div>
        <h2 className="text-2xl">Réservation des cours de pilate</h2>
      </div>
      <form className="ml-4 lg:absolute lg:right-10 flex flex-row justify-center items-center gap-4">
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
        <button
          onClick={handleHomeRedirect}
          disabled={isPending}
          className="flex gap-2"
        >
          <AiOutlineHome className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
