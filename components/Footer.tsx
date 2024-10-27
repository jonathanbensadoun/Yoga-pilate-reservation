"use client";
import Link from "next/link";

export default function Footer() {
  const nameURL = process.env.NEXT_PUBLIC_NAME_URL;
  return (
    <footer className="mt-20 bg-gray-50 flex flex-col md:flex-row justify-center items-center p-4 gap-2">
      <p>2024 Laure Sautier - Tous droits réservés ©</p>
      <div className="flex flex-row gap-2">
        <Link href={`${nameURL}/auth/terms`}>Conditions Générales</Link>
        <Link href={`${nameURL}/auth/privacy`}>Confidentialité</Link>
        <Link href={`${nameURL}/auth/faq`}>FAQ</Link>
      </div>
    </footer>
  );
}
