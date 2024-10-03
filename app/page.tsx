import { createClientServer } from "@/utils/supabase/server";

const getDatas = async () => {
  const supabase = createClientServer();

  const { data } = await supabase.from("reservations").select("*");
  return data;
};

export default async function Home() {
  const classes = await getDatas();
  console.log("result", classes);
  return (
    <main className="flex min-h-screen flex-col item-center justify-between p-24">
      <h1>mes reservation</h1>
    </main>
  );
}
