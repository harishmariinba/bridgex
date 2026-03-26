import { supabase } from "./supabase"

export async function checkUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}