import React from "react";

const FAQPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>FAQ</h1>
      <div>
        <h2>Réservation d&apos;un cours</h2>
        <p>Un cours peut être réservé jusqu&apos;au jour de la réservation.</p>
      </div>
      <div>
        <h2>Annulation d&apos;un cours</h2>
        <p>Le cours peut être annulé à tout moment mais pas 48h avant.</p>
      </div>
    </div>
  );
};

export default FAQPage;
