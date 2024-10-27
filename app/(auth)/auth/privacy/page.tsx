import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="bottom-0 h-screen flex flex-col justify-center items-center gap-4">
      <h2>Politique de confidentialité</h2>
      <p>
        Votre confidentialité est importante pour nous. Cette politique de
        confidentialité explique comment nous collectons, utilisons et
        protégeons vos données personnelles.
      </p>
      <h3>Collecte de données</h3>
      <p>
        Nous collectons des données personnelles lorsque vous vous inscrivez sur
        notre site, réservez un cours ou remplissez un formulaire. Les données
        collectées peuvent inclure votre nom, votre adresse e-mail, votre numéro
        de téléphone et d&apos;autres informations personnelles.
      </p>
      <h3>Utilisation des données</h3>
      <p>
        Nous utilisons les données collectées pour vous fournir des services,
        améliorer notre site web et personnaliser votre expérience utilisateur.
      </p>
      <h3>Protection des données</h3>
      <p>
        Nous mettons en œuvre des mesures de sécurité pour protéger vos données
        personnelles contre tout accès non autorisé.
      </p>
    </div>
  );
};

export default PrivacyPage;
