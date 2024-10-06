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