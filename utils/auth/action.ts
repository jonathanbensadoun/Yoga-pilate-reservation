'use server'

import { redirect } from "next/navigation";
import { createClientServer } from "../supabase/server";

export const signInWithPassword = async (data: FormData) => {
    const supabase = createClientServer();

    const { error } = await supabase.auth.signInWithPassword({
        email: data.get('email') as string,
        password: data.get('password') as string,
    })
    if (error) {
       throw error
    }
    redirect("/")
}

export const signOut = async () => {
    const supabase = createClientServer();
    await supabase.auth.signOut()
    redirect("/auth")
}

export const signUpWithPassword = async (data: FormData) => {
    const supabase = createClientServer();
    const { error } = await supabase.auth.signUp({
        email: data.get('email') as string,
        password: data.get('password') as string,
        options: {
            data: {
                first_name: data.get('first_name') as string,
                last_name: data.get('last_name') as string,
                phone: data.get('phone') as string,
            }
        }
    })
    if (error) {
               throw error
    }
    redirect("/")
}

export const getReservations = async () => {   
    const supabase = createClientServer();
    const { data, error } = await supabase.from("reservations").select("*");
    // console.log("getReservations",data)
    if (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
    
  
    return data;
}

export const getClasses = async (selectedDateForFetch: Date) => {
    const supabase = createClientServer();   
    const startOfDay = new Date(selectedDateForFetch.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(selectedDateForFetch.setHours(23, 59, 59, 999)).toISOString();
    console.log("startOfDay",startOfDay)    
    console.log("endOfDay",endOfDay)
    const { data, error } = await supabase
        .from("classes")
        .select("*")
        .gte("class_date", startOfDay)
        .lte("class_date", endOfDay)
        .order("class_date", { ascending: true });
    console.log("getClasses",data)
    if (error) {
        console.error("Error fetching classes:", error);
        return [];
    }
    return data;
}
export const getAllClasses = async () => {
    const supabase = createClientServer();
    const { data, error } = await supabase.from("classes").select("*").order("class_date", { ascending: true });
    // console.log("getallclasse",data)

    if (error) {
        console.error("Error fetching classes:", error);
        return [];
    }
    return data;
}

export const getClassesDate = async () => {   
    const supabase = createClientServer();
    const { data, error } = await supabase
        .from("classes")
        .select("class_date, available_slots")
        .gte("class_date", new Date().toISOString())
        // .gt("available_slots", 0) 
        .order("class_date", { ascending: true });
        // console.log("getClassesDate",data)
    if (error) {
        console.error("Error fetching classes:", error);
        return [];
    }
    return data;
}

export const getProfile = async () => {
    const supabase = createClientServer();
    const { data, error } = await supabase.from("profiles").select("*");
   
    if (error) {
        console.error("Error fetching profile:", error);
        return [];
    }
    return data;
}

export const getAllProfiles = async () => {
    const supabase = createClientServer();
    const { data, error } = await supabase.from("profiles_contact_details").select("*");
   
    if (error) {
        console.error("Error fetching profile:", error);
        return [];
    }
    return data;
}

export const createClass = async (formData: FormData) => {
    const supabase = createClientServer();
    const { error } = await supabase.from("classes").insert([
        {
            title: formData.get("title") as string | null,
            description: formData.get("description") as string | null,
            duration: formData.get("duration") ? parseInt(formData.get("duration") as string, 10) : null,
            available_slots: formData.get("available_slots") ? parseInt(formData.get("available_slots") as string, 10) : null,
            class_date: formData.get("class_date") ? new Date(formData.get("class_date") as string).toISOString() : null
           
        },
    ]);
    if (error) {
        console.error("Error creating class:", error);
        throw error;
    }
}

export const deleteClass = async (id: string) => {
    const supabase = createClientServer();
    const { error } = await supabase.from("classes").delete().match({ id });
    if (error) {
        console.error("Error deleting class:", error);
        throw error;
    }
}

export const addReservation = async (classId: string, userId:string ) => {
    const supabase = createClientServer();
   
    const {error} = await supabase
    .from("reservations")
    .insert([{
       user_id: userId,
       classes_id: classId,
    }]);

    if (error) {
        
        throw error;
    }
}

export const deleteReservation = async (id: string) => {
    const supabase = createClientServer();
    const { error } = await supabase.from("reservations").delete().match({ id });
    if (error) {
        
        throw error;
    }
}

