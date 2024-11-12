import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-14 h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700">
        FAQ - Foire Aux Questions
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Retrouvez ici les réponses aux questions les plus fréquentes concernant
        notre service de réservation de cours de Pilates.
      </p>

      <Accordion type="single" collapsible>
        {/* Question 1 */}
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Comment réserver un cours de Pilates ?
          </AccordionTrigger>
          <AccordionContent>
            Pour réserver un cours de Pilates, connectez-vous à votre compte,
            choisissez la session qui vous intéresse et suivez les instructions
            pour confirmer la réservation et effectuer le paiement en ligne.
          </AccordionContent>
        </AccordionItem>

        {/* Question 2 */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Comment annuler une réservation ?</AccordionTrigger>
          <AccordionContent>
            Les annulations peuvent être effectuées jusqu’à 48 heures avant le
            début du cours. Connectez-vous à votre compte, accédez à vos
            réservations, et choisissez l&apos;option &quot;Annuler&quot;. Les
            annulations après le délai ne sont pas remboursables.
          </AccordionContent>
        </AccordionItem>

        {/* Question 4 */}
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Y a-t-il des frais d&apos;adhésion ?
          </AccordionTrigger>
          <AccordionContent>
            Non, il n&apos;y a pas de frais d&apos;adhésion pour
            l&apos;inscription à notre plateforme. Vous ne payez que pour les
            cours que vous réservez.
          </AccordionContent>
        </AccordionItem>

        {/* Question 5 */}
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Comment puis-je contacter le support client ?
          </AccordionTrigger>
          <AccordionContent>
            Vous pouvez nous contacter par email à l&apos;adresse{" "}
            <a
              href="mailto:laurecoachpilates@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              laurecoachpilates@gmail.com
            </a>
            . Notre équipe de support vous répondra dans les plus brefs délais.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQPage;
