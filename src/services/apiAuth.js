import { assertOnline, normalizeError } from "#lib/utils";
import supabase from "./supabase";

export async function loginAPI({ email, password }) {
  assertOnline();
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw normalizeError(error);
  return data;
}

export async function loginOAuthAPI() {
  assertOnline();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;
  return data;
}

export async function signupAPI({ email, password, fullName }) {
  assertOnline();
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) throw normalizeError(error);

  return data;
}

export async function signoutAPI() {
  assertOnline();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw normalizeError(error);
}

export async function deleteUserAPI() {
  assertOnline();
  const { data, error } = await supabase.functions.invoke("delete-user", {
    method: "DELETE",
  });
  console.log({ error });
  if (error) throw error;
  return data;
}
