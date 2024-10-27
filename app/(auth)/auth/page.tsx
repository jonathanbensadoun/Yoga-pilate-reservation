"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPassword, signUpWithPassword } from "@/utils/auth/action";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState(false);
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
    setError(null);
    const password = formData.get("password") as string;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^0[1-9]([-. ]?[0-9]{2}){4}$/;

    if (signup && !phoneRegex.test(formData.get("phone") as string)) {
      setError("Numéro de téléphone invalide");
      return;
    }
    if (signup && !emailRegex.test(formData.get("email") as string)) {
      setError("Email invalide");
      return;
    }

    if (
      signup &&
      formData.get("password") !== formData.get("confirm_password")
    ) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (signup && !passwordRegex.test(password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
      return;
    }
    if (signup) {
      handleSignUp(formData);
      setError(null);
    } else {
      handleSignIn(formData);
      setError(null);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        className="rounded-full mb-8 w-2/3 md:w-1/3 xl:w-1/4 h-auto"
        src="/img/Logo_Laure_S.jpg"
        width="0"
        height="0"
        placeholder="empty"
        priority={true}
        alt="Logo de Laure Sautier c'est des mains qui entoure le buste d'une personne représente la proffession de Ostéopathe"
      />
      <h2 className="text-2xl">{!signup ? "Connexion" : "Inscription"}</h2>
      <form action={handleSubmit} className="w-full md:w2/3 lg:w-1/3 p-4">
        <fieldset
          className="grid drif-cols-1 w-full gap-4"
          disabled={isPending}
        >
          <Input type="email" name="email" placeholder="Email" required />
          <div className="relative">
            <Input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              required
            />
            {!passwordVisibility ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            )}
          </div>
          {signup && (
            <div className="relative">
              <Input
                type={passwordConfirmationVisibility ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirmez le mot de passe"
                required
              />
              {!passwordConfirmationVisibility ? (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setPasswordConfirmationVisibility(
                      !passwordConfirmationVisibility
                    )
                  }
                />
              ) : (
                <AiOutlineEye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setPasswordConfirmationVisibility(
                      !passwordConfirmationVisibility
                    )
                  }
                />
              )}
            </div>
          )}
          {signup && (
            <>
              <Input
                type="first_name"
                name="first_name"
                placeholder="Prénom"
                required
              />
              <Input
                type="last_name"
                name="last_name"
                placeholder="Nom"
                required
              />
              <Input
                type="phone"
                name="phone"
                placeholder="Téléphone"
                required
              />
            </>
          )}
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
