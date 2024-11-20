import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700">
        Conditions Générales d&apos;Utilisation
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Bienvenue sur notre site de réservation de cours de Pilates. Veuillez
        lire attentivement nos conditions générales d&apos;utilisation avant de
        réserver un cours.
      </p>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Les présentes conditions générales d’utilisation (CGU) régissent
          l’utilisation de notre plateforme de réservation de cours de Pilates.
          En accédant à ce site, vous acceptez sans réserve les présentes CGU.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          2. Inscription et Utilisation du Compte
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Pour réserver des cours, vous devez créer un compte sur notre
          plateforme. Vous êtes responsable de la confidentialité de vos
          identifiants et de toutes les activités effectuées sur votre compte.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>
            Vous devez fournir des informations exactes lors de l’inscription.
          </li>
          <li>
            Vous êtes responsable de maintenir la sécurité de votre compte.
          </li>
          <li>
            En cas de suspicion d&apos;utilisation frauduleuse, contactez-nous
            immédiatement.
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          3. Réservation et Annulation
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Les réservations de cours peuvent être effectuées via notre site en
          fonction des disponibilités. Toute annulation doit être effectuée au
          moins 48 heures à l’avance pour obtenir un remboursement complet.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>
            Les annulations effectuées après le délai imparti ne seront pas
            remboursées.
          </li>
          <li>
            Les absences sans notification préalable seront considérées comme
            consommées.
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          4. Responsabilité
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous nous efforçons de maintenir la disponibilité et la sécurité de
          notre site, mais nous ne pouvons garantir un accès ininterrompu. Nous
          ne serons pas tenus responsables des dommages liés à l’utilisation du
          site.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          5. Modifications des CGU
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous nous réservons le droit de modifier les présentes CGU à tout
          moment. Les utilisateurs seront informés des modifications et devront
          les accepter pour continuer à utiliser nos services.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          6. Contact
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Pour toute question concernant ces conditions générales
          d&apos;utilisation, veuillez nous contacter à{" "}
          <a
            href="mailto:laurecoachpilates@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            laurecoachpilates@gmail.com
          </a>
          .
        </p>
      </section>
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          7. Droit applicable
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Les présentes conditions générales d’utilisation sont régies par le
          droit français.
        </p>
      </section>

      <div className="text-center mt-10">
        <Button className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800">
          <Link href={`/`}>Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default TermsPage;
