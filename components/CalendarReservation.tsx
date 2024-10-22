import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

export default function CalendarReservation() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  return (
    <div className="w-full flex justify-center items-center">
      <Calendar
        captionLayout="dropdown-buttons"
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString()}`
            : "Pick a day."
        }
        // fromYear={1990}
        // toYear={2024}
      />
    </div>
  );
}
