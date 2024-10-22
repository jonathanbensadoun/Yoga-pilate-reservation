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
    console.log("delete reservation", id);
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
        {reservations.map((reservation) => {
          const reservedClass = classes.find(
            (classe) => classe.id === reservation.classes_id
          );
          return (
            <li key={reservation.id} className="border rounded-md mt-2 p-4 ">
              <div className="flex justify-between items-center ">
                <Image
                  src="/img/Pilate.png"
                  alt="sale de pilate"
                  width={80}
                  height={80}
                />
                <div>
                  <p>Titre du cours: {reservedClass?.title}</p>
                  <p>Description: {reservedClass?.description}</p>
                  <p>
                    Date:{" "}
                    {new Date(
                      reservedClass?.class_date || ""
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
                {new Date(reservedClass?.class_date || "").getTime() -
                  new Date().getTime() >
                48 * 60 * 60 * 1000 ? (
                  <>
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
                  </>
                ) : (
                  <p className="text-red-500">
                    Vous ne pouvez plus annuler cette réservation.
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reservations;