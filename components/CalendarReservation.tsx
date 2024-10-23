import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

interface Classes {
  available_slots: number | null;
  class_date: string | null;
  created_at: string;
  description: string | null;
  duration: number | null;
  id: string;
  title: string | null;
}

interface ClasseDate {
  class_date: string | null;
}

interface CalendarReservationProps {
  classes: Classes[];
  classesDate: ClasseDate[];
}

export default function CalendarReservation({
  classes,
  classesDate,
}: CalendarReservationProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  // Convertir `classesDate` en objets `Date`
  const bookedDays = classesDate
    .map((classe) => classe.class_date)
    .filter((date) => date !== null) // Filtrer les dates nulles
    .map((date) => new Date(date as string)); // Convertir en objets Date

  return (
    <div className="w-full flex justify-center items-center">
      <Calendar
        captionLayout="dropdown-buttons"
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
        footer={
          selected
            ? ` ${selected.toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`
            : "Pick a day."
        }
        disabled={(date) => date < new Date()}
        // Ajouter la logique pour colorer les jours avec classes en vert
        modifiers={{
          booked: bookedDays, // Les jours réservés sont marqués comme 'booked'
        }}
        modifiersClassNames={{
          booked: "bg-green-500 text-white", // Fond vert pour les jours réservés
        }}
        defaultMonth={bookedDays[0]} // Mois par défaut pour la vue du calendrier
      />
    </div>
  );
}
