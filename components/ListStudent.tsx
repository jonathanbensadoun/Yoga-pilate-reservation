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
import { Button } from "./ui/button";

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
interface AllProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}
interface ListStudentProps {
  reservations: Reservation[];
  classes: Classe[];
  allProfiles: AllProfile[];
  startTransition: React.TransitionStartFunction;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  setSuccessAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  classesId: string;
}

export default function ListStudent({
  reservations,
  classes,
  allProfiles,
  startTransition,
  setMessageAlert,
  setSuccessAddClass,
  setErrorAddClass,
  setReload,
  classesId,
}: ListStudentProps) {
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
      {classes.map((classe) => (
        <div key={classe.id}>
          <ul>
            {reservations
              .filter((reservation) => reservation.classes_id === classe.id)
              .map((reservation) => {
                const profile = allProfiles.find(
                  (profile: AllProfile) => profile.id === reservation.user_id
                );
                return (
                  <li key={reservation.id}>
                    {profile && classe.id === classesId && (
                      <div className="border p-2 m-1 rounded-md flex flex-col justify-center items-center">
                        <div>
                          {profile.first_name} {profile.last_name}
                        </div>
                        <div>Email: {profile.email}</div>
                        <div>Téléphone: {profile.phone}</div>
                        {/* <p>{reservation.id}</p> // pour afficher l'id de la réservervation */}

                        <div className="mt-4">
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
                                  Êtes-vous sûr de vouloir annuler cette
                                  réservation de {profile.first_name}{" "}
                                  {profile.last_name} ?
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
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
