"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPassword, signUpWithPassword } from "@/utils/auth/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const query = useSearchParams().get("query");

  const signup = query === "signup";

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
    if (signup) {
      handleSignUp(formData);
    } else {
      handleSignIn(formData);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/img/Logo_Laure_S.jpg"
        width={300}
        height={150}
        className="rounded-full mb-8"
        alt="Logo de Laure Sautier c'est des mains qui entoure le buste d'une personne représente la proffession de Ostéopathe"
      />
      <h2 className="text-2xl">{!signup ? "Connexion" : "Inscription"}</h2>
      <form action={handleSubmit} className="w-full md:w2/3 lg:w-1/3 p-4">
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
            {!signup ? "Se connecter" : "S'inscrire"}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />
          </Button>
        </fieldset>
      </form>
      <Link
        href={signup ? "/auth?query=signin" : "/auth?query=signup"}
        className="mt-6 hover:underline"
      >
        {!signup ? "Pas encore de compte ?" : "Déjà un compte ?"}
      </Link>
    </div>
  );
}
