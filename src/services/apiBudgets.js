import { assertOnline } from "#lib/utils";
import supabase from "./supabase";

export async function addBudgetAPI({ category, amount }) {
  assertOnline();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const { data, error } = await supabase
    .from("budgets")
    .insert([{ category, amount, user_id: user.id }])
    .select();
  if (error) throw error;
  return data;
}
export async function getBudgetsAPI() {
  assertOnline();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data: budgets = [], error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }
  const seenCategories = new Set();
  return budgets.filter((budget) => {
    const category = budget.category;
    if (seenCategories.has(category)) {
      return false;
    }
    seenCategories.add(category);
    return true;
  });
}

export async function deleteBudgetAPI(category) {
  assertOnline();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id)
    .eq("category", category);

  if (error) throw error;

  return true;
}
