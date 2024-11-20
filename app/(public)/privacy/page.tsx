import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700 ">
        Politique de Confidentialité
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Votre vie privée est importante pour nous. Cette politique explique
        comment nous collectons, utilisons et protégeons vos informations
        personnelles.
      </p>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          En utilisant notre plateforme de réservation de cours de Pilates, vous
          acceptez notre politique de confidentialité. Nous nous engageons à
          protéger vos données personnelles conformément aux lois en vigueur.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          2. Collecte des Informations
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous collectons des informations que vous nous fournissez lors de
          l&apos;inscription, de la réservation et de l&apos;utilisation de
          notre site, telles que :
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>Nom, prénom et informations de contact</li>
          <li>Détails de la réservation et préférences de cours</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          3. Utilisation des Informations
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Les informations collectées sont utilisées pour :
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>Gérer vos réservations et vos comptes utilisateurs</li>
          <li>Améliorer notre site et nos services</li>
          <li>Envoyer des notifications et des confirmations de réservation</li>
          <li>Respecter nos obligations légales</li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          4. Partage des Informations
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous ne partageons vos informations personnelles qu’avec :
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>
            Les prestataires de services essentiels (paiement, hébergement,
            etc.)
          </li>
          <li>Les autorités légales si requis par la loi</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Vos informations ne sont pas vendues à des tiers.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          5. Sécurité des Données
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous mettons en place des mesures de sécurité pour protéger vos
          données personnelles contre tout accès non autorisé, divulgation ou
          destruction. Cependant, aucune méthode de transmission sur Internet
          n&apos;est totalement sécurisée.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          6. Conservation des Données
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous conservons vos données personnelles aussi longtemps que
          nécessaire pour vous fournir nos services ou pour respecter nos
          obligations légales.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          7. Vos Droits
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Conformément à la législation sur la protection des données, vous avez
          le droit d&apos;accéder à vos informations, de les corriger, de
          demander leur suppression ou de limiter leur traitement.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Pour exercer ces droits, contactez-nous à{" "}
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
          8. Modifications de la Politique
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Les changements seront publiés sur
          cette page et prendront effet dès leur publication.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          9. Contact
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Pour toute question concernant cette politique de confidentialité,
          veuillez nous contacter à{" "}
          <a
            href="mailto:laurecoachpilates@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            laurecoachpilates@gmail.com
          </a>
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

export default PrivacyPage;
