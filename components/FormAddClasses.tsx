import React from "react";

import { createClass } from "@/utils/auth/action";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { IoClose } from "react-icons/io5";

interface FormAddClassesProps {
  startTransition: React.TransitionStartFunction;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  setSuccessAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;

  setAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
}

const FormAddClasses: React.FC<FormAddClassesProps> = ({
  startTransition,
  setMessageAlert,
  setSuccessAddClass,
  setErrorAddClass,
  setReload,
  selectedDate,
  setSelectedDate,
  setAddClass,
  isPending,
}) => {
  const handleSubmit = async (formData: FormData) => {
    startTransition(() => {
      formData.set("class_date", selectedDate?.toISOString() || "");
      createClass(formData)
        .then(() => {
          setMessageAlert("Le cours a été ajouté avec succès.");
          setSuccessAddClass(true);
        })
        .catch(() => {
          setMessageAlert("Une erreur est survenue, veuillez réessayer");
          setErrorAddClass(true);
        });
    });
    setAddClass(false);
    setReload(true);
  };
  return (
    <form
      action={handleSubmit}
      className=" md:w2/3 lg:w-1/3 shadow border rounded-lg p-4"
    >
      <div className="flex justify-end" onClick={() => setAddClass(false)}>
        <IoClose className="text-2xl" />
      </div>
      <fieldset className="grid drif-cols-1 w-full gap-4" disabled={isPending}>
        <h2 className="text-2xl font-bold ">Ajouter un cours</h2>
        <div>
          <label htmlFor="title">Titre</label>
          <Input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Input type="text" id="description" name="description" />
        </div>
        <div>
          <label htmlFor="duration">Durée (minutes)</label>
          <Input type="number" id="duration" name="duration" required />
        </div>
        <div>
          <label htmlFor="available_slots">Places disponibles</label>
          <Input
            type="number"
            id="available_slots"
            name="available_slots"
            required
          />
        </div>
        <div className=" flex flex-col justify-center items-center gap-4  ">
          <div>
            <label htmlFor="class_date" className="mr-4">
              Date et heure
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button>Selection de la date et de l&apos;heure</Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
                <Input
                  step={60}
                  type="time"
                  id="class_time"
                  name="class_time"
                  onChange={(e) => {
                    const timeParts = e.target.value.split(":");
                    if (selectedDate) {
                      const newDate = new Date(selectedDate);
                      newDate.setHours(parseInt(timeParts[0], 10));
                      newDate.setMinutes(parseInt(timeParts[1], 10));
                      setSelectedDate(newDate);
                    }
                  }}
                  required
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <p className="text-xl font-bold mt-4">
                {selectedDate.toLocaleDateString("fr-FR")}{" "}
                {selectedDate.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="bg-green-300 text-green-800">
          Ajouter le cours
        </Button>
        <Button onClick={() => setAddClass(false)} className="bg-orange-400">
          Annuler
        </Button>
      </fieldset>
    </form>
  );
};

export default FormAddClasses;
