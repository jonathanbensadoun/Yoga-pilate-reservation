"use client";

import React, { useState, useTransition, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState(false);
  const [messages, setMessages] = useState("");
  const [signup, setSignup] = useState(false);
  const searchParams = useSearchParams();

  // const query = searchParams.get("query");

  useEffect(() => {
    setSignup(searchParams.get("query") === "signup");
  }, [searchParams]);
  // const signup = query === "signup";

  const handleSignIn = (formData: FormData) => {
    startTransition(() => {
      signInWithPassword(formData).catch(() => {
        setError("Mot de passe ou email incorrect");
      });
    });
  };

  const handleSignUp = (formData: FormData) => {
    startTransition(() => {
      signUpWithPassword(formData)
        .then(() => {
          setMessages(
            "inscription réussie consultez votre boite mail pour activer votre compte"
          );
        })
        .catch(() => {
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
        width={1798}
        height={2454}
        placeholder="empty"
        priority
        alt="Logo de Laure Sautier c'est des mains qui entoure le buste d'une personne représente la proffession de Ostéopathe"
      />
      <form action={handleSubmit} className="w-full md:w2/3 lg:w-1/3 p-4">
        {messages.length > 0 && (
          <Alert className="bg-green-200 ">
            <RocketIcon className="h-4 w-4" />
            <AlertDescription>{messages}</AlertDescription>
          </Alert>
        )}
        <h2 className="text-2xl text-center my-4">
          {!signup ? "Connexion" : "Inscription"}
        </h2>
        <fieldset
          className="grid drif-cols-1 w-full gap-4"
          disabled={isPending}
        >
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" placeholder="Email" required />
          <div className="relative">
            <label htmlFor="password">Mot de passe</label>
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
              <label htmlFor="confirm_password">
                Confirmez le mot de passe
              </label>
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
              <label htmlFor="first_name">Prénom</label>
              <Input
                type="first_name"
                name="first_name"
                placeholder="Prénom"
                required
              />
              <label htmlFor="last_name">Nom</label>
              <Input
                type="last_name"
                name="last_name"
                placeholder="Nom"
                required
              />
              <label htmlFor="phone">Téléphone</label>
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
        onClick={() => {
          setMessages("");
        }}
      >
        {!signup ? "Pas encore de compte ?" : "Déjà un compte ?"}
      </Link>
    </div>
  );
}
