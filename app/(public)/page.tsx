"use client";
import { useEffect, useState, useTransition } from "react";
import { FaTrash } from "react-icons/fa";

import { MdAddCircle } from "react-icons/md";

import {
  deleteClass,
  getClasses,
  getProfile,
  getReservations,
  addReservation,
} from "@/utils/auth/action";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Reservations from "@/components/Reservations";
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
} from "@/components/ui/alert-dialog";
import FormAddClasses from "@/components/FormAddClasses";

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
interface Profil {
  admin: boolean | null;
  email: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
}

export default function Home() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [profil, setProfile] = useState<Profil | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isPending, startTransition] = useTransition();
  const [reload, setReload] = useState<boolean>(false);
  const [successAddClass, setSuccessAddClass] = useState<boolean>(false);
  const [errorAddClass, setErrorAddClass] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [addClass, setAddClass] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const dataReservations = await getReservations();
      const dataClasses = await getClasses();
      const dataProfile = await getProfile();
      setProfile(dataProfile[0]);
      setReservations(dataReservations);
      setClasses(dataClasses);
      setReload(false);
    }

    fetchData();
  }, [reload]);

  const handleDelete = async (id: string) => {
    startTransition(() => {
      deleteClass(id)
        .then(() => {
          setMessageAlert("Le cours a été supprimé avec succès.");
          setSuccessAddClass(true);
        })
        .catch(() => {
          setMessageAlert("Une erreur est survenue, veuillez réessayer");
          setErrorAddClass(true);
        });
    });
    setReload(true);
  };

  const handleReservation = async (classId: string, userId: string) => {
    startTransition(() => {
      addReservation(classId, userId)
        .then(() => {
          setMessageAlert("Le cours a été réserver avec succès.");
          setSuccessAddClass(true);
        })
        .catch(() => {
          setMessageAlert("Une erreur est survenue, veuillez réessayer");
          setErrorAddClass(true);
        });
    });
    setReload(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessAddClass(false);
      setErrorAddClass(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [successAddClass, errorAddClass]);
  useEffect(() => {
    console.log("profil", profil);
  }, [profil]);

  return (
    <main className="flex min-h-screen flex-col  item-center p-24 text-center">
      {successAddClass && (
        <Alert
          className="absolute right-0 left-0 top-0 text-green-700 bg-green-200"
          onClick={() => {
            setSuccessAddClass(false);
            setErrorAddClass(false);
          }}
        >
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{messageAlert}</AlertDescription>
        </Alert>
      )}
      {errorAddClass && (
        <Alert className="absolute right-0 left-0 top-0 text-red-700 bg-red-200">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messageAlert}</AlertDescription>
        </Alert>
      )}

      <h2 className="text-2xl font-bold ">Les cours actuels</h2>
      {classes.length >= 1 ? (
        <ul className="flex flex-col justify-center items-center my-4">
          {classes.map((classe) => (
            <li
              key={classe.id}
              className="border rounded-md p-2 my-2 flex flex-col md:flex-row justify-around items-center gap-4 lg:w-1/3"
            >
              <div className="flex flex-col justify-center items-center gap-2 ">
                <Image
                  src="/img/Pilate.png"
                  alt="sale de pilate"
                  width={80}
                  height={80}
                />
                <h3 className="text-xl font-bold">{classe.title}</h3>
                {classe.description && <p>description: {classe.description}</p>}
                <p>Durée: {classe.duration} minutes</p>
                <p>
                  Date:{" "}
                  {new Date(classe.class_date || "").toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className={`${
                        classe.available_slots === 0
                          ? "bg-gray-500"
                          : "bg-green-500"
                      }`}
                      disabled={
                        classe.available_slots === 0 || profil?.admin === true
                      }
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
                      <AlertDialogTitle>
                        Confirmer la réservation
                      </AlertDialogTitle>
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

              {profil && profil.admin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-red-500">
                      <FaTrash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirmer la suppression
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer ce cours ? Cette
                        action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(classe.id)}
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-2 text-xl">Pas de cours</p>
      )}
      <div className="flex flex-col justify-center items-center gap-4">
        {!addClass && profil && profil.admin && (
          <MdAddCircle
            onClick={() => setAddClass(true)}
            className="w-12 h-12 hover:text-green-900 hover:h-14 hover:w-14 cursor-pointer"
          />
        )}
        {addClass && profil && profil.admin && (
          <FormAddClasses
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setAddClass={setAddClass}
            startTransition={startTransition}
            setSuccessAddClass={setSuccessAddClass}
            setErrorAddClass={setErrorAddClass}
            setReload={setReload}
            setMessageAlert={setMessageAlert}
            isPending={isPending}
          />
        )}

        {profil && !profil.admin && (
          <div className="lg:w-1/3">
            <Reservations
              reservations={reservations}
              classes={classes}
              startTransition={startTransition}
              setMessageAlert={setMessageAlert}
              setSuccessAddClass={setSuccessAddClass}
              setErrorAddClass={setErrorAddClass}
              setReload={setReload}
            />
          </div>
        )}
      </div>
    </main>
  );
}
