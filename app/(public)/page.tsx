"use client";
import { useEffect, useState } from "react";

import { getReservations } from "@/utils/auth/action";

export default function Home() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getReservations();
      console.log("Data fetched in component:", data);
      setReservations(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("result", reservations);
  }, [reservations]);
  console.log("Current reservations state:", reservations);
  return (
    <main className="flex min-h-screen flex-col item-center p-24">
      <h1>mes reservation</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.id} - {reservation.created_at}
          </li>
        ))}
      </ul>
    </main>
  );
}
