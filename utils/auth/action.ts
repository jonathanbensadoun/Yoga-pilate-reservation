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
    })
    if (error) {
       throw error
    }
    redirect("/")
}

export const getReservations = async () => {   
    const supabase = createClientServer();
    const { data, error } = await supabase.from("reservations").select("*");
    
    if (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
    
  
    return data;
}

export const getClasses = async () => {
    const supabase = createClientServer();
    const { data, error } = await supabase.from("classes").select("*");
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
        console.error("Error creating reservation:", error);
        throw error;
    }
}