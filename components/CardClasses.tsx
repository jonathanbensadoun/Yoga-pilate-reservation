import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface CardClassesProps {
  classe: {
    available_slots: number | null;
    class_date: string | null;
    created_at: string;
    description: string | null;
    duration: number | null;
    id: string;
    title: string | null;
  };
  handleReservation: (id: string, user_id: string) => void;
  profil: {
    admin: boolean | null;
    email: string | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
  };
}

export default function CardClasses({
  classe,
  handleReservation,
  profil,
}: CardClassesProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <Image
        className="rounded-md w-1/2 md:w-1/3 h-auto "
        src="/img/Pilate.png"
        alt="sale de pilate"
        width="776"
        height="997"
        priority={true}
      />
      <h3 className="text-xl font-bold">{classe.title}</h3>
      {classe.description && <p>Description: {classe.description}</p>}
      <p>Durée: {classe.duration} minutes</p>
      <p>
        Date:{" "}
        {new Date(classe.class_date || "").toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className={`${
              classe.available_slots === 0 ? "bg-gray-500" : "bg-green-500"
            }`}
            disabled={classe.available_slots === 0 || profil?.admin === true}
            title="Réserver ce cours"
            onMouseEnter={(e) => {
              if (classe.available_slots !== 0 && !profil?.admin) {
                e.currentTarget.textContent = "Réserver ce cours";
              }
            }}
            onMouseLeave={(e) => {
              if (classe.available_slots !== 0 && !profil?.admin) {
                e.currentTarget.textContent = `${classe.available_slots} places disponibles`;
              }
            }}
          >
            {classe.available_slots === 0
              ? "Complet"
              : `${classe.available_slots} places disponibles`}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la réservation</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir réserver ce cours ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (profil) {
                  handleReservation(classe.id, profil.id);
                }
              }}
            >
              Réserver
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
