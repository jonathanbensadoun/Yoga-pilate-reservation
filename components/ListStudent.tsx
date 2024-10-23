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
}

export default function ListStudent({
  reservations,
  classes,
  allProfiles,
}: ListStudentProps) {
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
                    {profile ? (
                      <>
                        <div>
                          Name: {profile.first_name} {profile.last_name}
                        </div>
                        <div>Email: {profile.email}</div>
                        <div>Phone: {profile.phone}</div>
                      </>
                    ) : (
                      <div>Profile not found</div>
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
