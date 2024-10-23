import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { deleteReservation } from "../utils/auth/action";

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
} from "@/components/ui/alert-dialog";
interface Reservation {
  classes_id: string | null;
  created_at: string;
  id: string;
  status: string | null;
  user_id: string | null;
}

interface Classe {
  available_slots: number | null;
  class_date: string | null;
  created_at: string;
  description: string | null;
  duration: number | null;
  id: string;
  title: string | null;
}

interface ReservationsProps {
  reservations: Reservation[];
  classes: Classe[];
  startTransition: React.TransitionStartFunction;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  setSuccessAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reservations: React.FC<ReservationsProps> = ({
  reservations,
  classes,
  startTransition,
  setMessageAlert,
  setSuccessAddClass,
  setErrorAddClass,
  setReload,
}) => {
  const handleDeleteReservation = (id: string) => {
    startTransition(() => {
      deleteReservation(id)
        .then(() => {
          setMessageAlert("La réservation a été annulée avec succès.");
          setSuccessAddClass(true);
        })
        .catch(() => {
          setMessageAlert("Une erreur est survenue, veuillez réessayer");
          setErrorAddClass(true);
        });
    });
    setReload(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Mes réservations</h2>
      <ul>
        {reservations
          .map((reservation) => {
            const reservedClass = classes.find(
              (classe) => classe.id === reservation.classes_id
            );
            return { ...reservation, reservedClass };
          })
          .sort((a, b) => {
            const dateA = new Date(a.reservedClass?.class_date || "").getTime();
            const dateB = new Date(b.reservedClass?.class_date || "").getTime();
            return dateA - dateB;
          })
          .map((reservation) => (
            <li
              key={reservation.id}
              className="border rounded-md mt-2 p-4 shadow "
            >
              <div className="flex flex-col md:flex-row justify-between items-center ">
                <Image
                  className="rounded-md w-1/2 md:w-1/3 xl:1/5 h-auto"
                  src="/img/Pilate.png"
                  alt="sale de pilate"
                  width="776"
                  height="997"
                  priority={true}
                />
                <div>
                  <p>Titre du cours: {reservation.reservedClass?.title}</p>
                  <p>Description: {reservation.reservedClass?.description}</p>
                  <p>
                    Date:{" "}
                    {new Date(
                      reservation.reservedClass?.class_date || ""
                    ).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {new Date(
                  reservation.reservedClass?.class_date || ""
                ).getTime() -
                  new Date().getTime() >
                48 * 60 * 60 * 1000 ? (
                  <div className="w-1/3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-md">
                          Annuler
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmer l&apos;annulation
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir annuler cette réservation?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteReservation(reservation.id);
                            }}
                          >
                            Supprimer la réservation
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ) : (
                  <p className="text-red-500 w-full md:w-1/3">
                    Vous ne pouvez plus annuler cette réservation.
                  </p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Reservations;
