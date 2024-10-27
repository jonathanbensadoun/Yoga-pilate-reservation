import React, { useState } from "react";

interface AllProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}

interface AddPatientToClassProps {
  allProfiles: AllProfile[];
  classId: string;
  handleReservation: (id: string, user_id: string) => void;
}

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

const AddPatientToClass: React.FC<AddPatientToClassProps> = ({
  allProfiles,
  classId,
  handleReservation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = allProfiles.filter((profile) =>
    `${profile.first_name} ${profile.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleProfileClick = (userId: string) => {
    handleReservation(classId, userId);
    setIsPopoverOpen(false);
  };

  return (
    <div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button onClick={() => setIsPopoverOpen(true)}>
            Ajouter un patient
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Input
            type="text"
            placeholder="Rechercher un patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <div className="max-h-72 overflow-y-auto">
            <ul>
              {filteredProfiles.map((profile) => (
                <li
                  key={profile.id}
                  className="py-2 border-b"
                  onClick={() => handleProfileClick(profile.id)}
                >
                  <p>
                    {profile.first_name} {profile.last_name}
                  </p>
                  <p>{profile.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddPatientToClass;
