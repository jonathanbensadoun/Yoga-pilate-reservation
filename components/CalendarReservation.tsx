import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

interface ClasseDate {
  class_date: string | null;
}

interface CalendarReservationProps {
  classesDate: ClasseDate[];
  setSelectedDateForFetch: (date: Date) => void;
}

export default function CalendarReservation({
  classesDate,
  setSelectedDateForFetch,
}: CalendarReservationProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (selected) {
      setSelectedDateForFetch(selected);
    }
  }, [selected, setSelectedDateForFetch]);

  const bookedDays = classesDate
    .map((classe) => classe.class_date)
    .filter((date) => date !== null)
    .map((date) => new Date(date as string));

  return (
    <div className="w-full flex justify-center items-center mt-8 md:mt-0">
      <Calendar
        captionLayout="dropdown-buttons"
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border shadow"
        disabled={(date) =>
          date < new Date(new Date().setDate(new Date().getDate() - 1))
        }
        modifiers={{
          booked: bookedDays,
        }}
        modifiersClassNames={{
          booked: "bg-green-500 text-white",
        }}
        defaultMonth={bookedDays[0]}
      />
    </div>
  );
}
