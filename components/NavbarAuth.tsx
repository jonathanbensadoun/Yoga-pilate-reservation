"use client";
import { useTransition } from "react";
import { AiOutlineHome } from "react-icons/ai";

export default function NavbarAuth() {
  const [isPending, startTransition] = useTransition();

  const handleHomeRedirect = () => {
    startTransition(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="flex items-center justify-center px-8 p-4 fixed w-screen lg:w-2/3 xl:w-1/2 rounded-b-3xl bg-gray-50 z-40 shadow   top-0 ">
      <div>
        <h2 className="text-2xl">Réservation des cours de pilate</h2>
      </div>
      <div className="ml-4 lg:absolute lg:right-10">
        <button
          onClick={handleHomeRedirect}
          disabled={isPending}
          className="flex gap-2"
        >
          <AiOutlineHome />
        </button>
      </div>
    </div>
  );
}
