"use client";
import { useEffect, useState } from "react";

import { getClasses, getProfile, getReservations } from "@/utils/auth/action";

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
  useEffect(() => {
    async function fetchData() {
      const dataReservations = await getReservations();
      const dataClasses = await getClasses();
      const dataProfile = await getProfile();
      setProfile(dataProfile[0]);
      setReservations(dataReservations);
      setClasses(dataClasses);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("profil", profil);
  }, [profil]);

  return (
    <main className="flex min-h-screen flex-col item-center p-24">
      <h2>les cours</h2>
      <ul>
        {classes.map((classe) => (
          <li key={classe.id} className="border mt-2">
            {classe.id} - {classe.title} - {classe.description} -
            {classe.duration}h - {classe.class_date} - {classe.available_slots}{" "}
            places disponibles
          </li>
        ))}
      </ul>
      {profil && !profil.admin && (
        <div>
          <h2>mes reservation</h2>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id} className="border mt-2">
                {reservation.id} - {reservation.created_at} - classes_id:{" "}
                {reservation.classes_id} - user_id: {reservation.user_id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
