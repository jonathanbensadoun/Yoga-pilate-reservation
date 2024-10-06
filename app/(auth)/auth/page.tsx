"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPassword, signUpWithPassword } from "@/utils/auth/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const query = useSearchParams().get("query");

  const signin = query === "signin";

  const handleSignIn = (formData: FormData) => {
    startTransition(() => {
      signInWithPassword(formData).catch(() => {
        setError("Mot de passe ou email incorrect");
      });
    });
  };

  const handleSignUp = (formData: FormData) => {
    startTransition(() => {
      signUpWithPassword(formData).catch(() => {
        setError("Une erreur est survenue, veuillez réessayer");
      });
    });
  };

  const handleSubmit = (formData: FormData) => {
    if (signin) {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2>{signin ? "Connexion" : "Inscription"}</h2>
      <form action={handleSubmit} className="w-full md:w2/3 lg:w-1/2">
        <fieldset
          className="grid drif-cols-1 w-full gap-4"
          disabled={isPending}
        >
          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button className="flex gap-2">
            {signin ? "Se connecter" : "S'inscrire"}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />
          </Button>
        </fieldset>
      </form>
      <Link
        href={signin ? "/auth?query=signup" : "/auth?query=signin"}
        className="mt-6 hover:underline"
      >
        {signin ? "Pas encore de compte ?" : "Déjà un compte ?"}
      </Link>
    </div>
  );
}
