import { assertOnline, normalizeError } from "#lib/utils";
import supabase from "./supabase";

export async function getCurrentUserAPI() {
  assertOnline();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw normalizeError(error);
  return user;
}

export async function changeUserEmailAPI(newEmail) {
  assertOnline();
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    email: newEmail,
  });
  if (error) throw error;
  return user;
}

export async function changePasswordAPI({ currentPassword, newPassword }) {
  assertOnline();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });
  console.log({ error });
  if (error) throw error;
}
