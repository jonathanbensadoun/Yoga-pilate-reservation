"use client";

import { useEffect, useState, useTransition } from "react";

import { MdAddCircle } from "react-icons/md";

import {
  deleteClass,
  getClasses,
  getProfile,
  getReservations,
  addReservation,
  getClassesDate,
  getAllClasses,
  getAllProfiles,
} from "@/utils/auth/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Reservations from "@/components/Reservations";

import FormAddClasses from "@/components/FormAddClasses";
import DeleteClasses from "@/components/DeleteClasses";
import CardClasses from "@/components/CardClasses";
import CalendarReservation from "@/components/CalendarReservation";
import ListStudent from "@/components/ListStudent";
import AddPatientToClass from "@/components/AddPatientToClass";

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
interface ClasseDate {
  class_date: string | null;
  available_slots: number | null;
}
interface AllProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
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
  const [classesDate, setClassesDate] = useState<ClasseDate[]>([]);
  const [selectedDateForFetch, setSelectedDateForFetch] = useState<Date>(
    new Date()
  );
  const [allClasses, setAllClasses] = useState<Classe[]>([]);
  const [allProfiles, setAllProfiles] = useState<AllProfile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dataReservations = await getReservations();
      const dataProfile = await getProfile();
      const dataClassesDate = await getClassesDate();
      const dataAllClasses = await getAllClasses();

      setClassesDate(dataClassesDate);
      setProfile(dataProfile[0]);
      setReservations(dataReservations);
      setAllClasses(dataAllClasses);
      setReload(false);
    }

    fetchData();
  }, [reload]);

  useEffect(() => {
    async function fetchClasses() {
      const dataClasses = await getClasses(selectedDateForFetch);

      setClasses(dataClasses);
    }

    fetchClasses();
  }, [reload, selectedDateForFetch]);

  useEffect(() => {
    async function fetchProfiles() {
      if (profil && profil.admin) {
        const dataProfiles = await getAllProfiles();
        setAllProfiles(dataProfiles);
      }
    }
    fetchProfiles();
  }, [profil]);

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

  return (
    <main className="flex min-h-screen flex-col  item-center p-24 text-center">
      {successAddClass && (
        <Alert
          className="absolute right-0 left-0 top-0 text-green-700 bg-green-200 z-50"
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
        <Alert className="absolute right-0 left-0 top-0 text-red-700 bg-red-200 z-50">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messageAlert}</AlertDescription>
        </Alert>
      )}

      <CalendarReservation
        classesDate={classesDate}
        setSelectedDateForFetch={setSelectedDateForFetch}
      />
      <h2 className="text-2xl font-bold mt-4">
        Séance(s) du{" "}
        {selectedDateForFetch.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
      {classes.length >= 1 ? (
        <ul className="flex flex-col justify-center items-center my-4">
          {classes.map((classe) => (
            <li
              key={classe.id}
              className="border rounded-md p-2 my-2 flex flex-col justify-around items-center gap-4 lg:w-1/3 shadow"
            >
              <CardClasses
                classe={classe}
                handleReservation={handleReservation}
                profil={profil!}
              />
              {profil && profil.admin && (
                <AddPatientToClass
                  allProfiles={allProfiles}
                  classId={classe.id}
                  handleReservation={handleReservation}
                />
              )}

              {profil && profil.admin && (
                <ListStudent
                  classesId={classe.id}
                  reservations={reservations}
                  classes={classes}
                  allProfiles={allProfiles}
                  startTransition={startTransition}
                  setMessageAlert={setMessageAlert}
                  setSuccessAddClass={setSuccessAddClass}
                  setErrorAddClass={setErrorAddClass}
                  setReload={setReload}
                />
              )}
              {profil && profil.admin && (
                <DeleteClasses handleDelete={handleDelete} classe={classe} />
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
            className="w-12 h-12 hover:text-blue-200 hover:h-14 hover:w-14 cursor-pointer"
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
              classes={allClasses}
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
