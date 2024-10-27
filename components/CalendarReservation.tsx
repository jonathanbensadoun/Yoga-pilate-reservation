import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import CalendarLegend from "./CalendarLegend";

interface ClasseDate {
  class_date: string | null;
  available_slots: number | null;
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
    <div className="w-full flex flex-col md:flex-row justify-center items-center mt-8 md:mt-0 gap-4">
      <Calendar
        captionLayout="dropdown-buttons"
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border shadow"
        disabled={(date) =>
          date < new Date(new Date().setDate(new Date().getDate() - 1))
        }
        modifiers={bookedDays.reduce<Record<string, Date[]>>(
          (acc, date) => {
            const classesForDate = classesDate.filter(
              (classe) =>
                new Date(classe.class_date as string).toDateString() ===
                date.toDateString()
            );
            const availableSlots = classesForDate.reduce(
              (sum, classe) => sum + (classe.available_slots ?? 0),
              0
            );

            if (availableSlots === 0) {
              acc["unavailable"].push(date);
            } else if (availableSlots > 0 && availableSlots <= 3) {
              acc["limited"].push(date);
            } else {
              acc["available"].push(date);
            }

            return acc;
          },
          { available: [], limited: [], unavailable: [] }
        )}
        modifiersClassNames={{
          available: "bg-green-500 text-white",
          limited: "bg-orange-300 text-white",
          unavailable: "bg-gray-300 text-white",
        }}
        defaultMonth={bookedDays[0]}
      />
      <CalendarLegend />
    </div>
  );
}
