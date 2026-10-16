import { assertOnline, normalizeError } from "#lib/utils";
import supabase from "./supabase";

export async function addExpenseAPI({ amount, category, description }) {
  assertOnline();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("expenses")
    .insert([{ amount, category, description, user_id: user.id }])
    .select();
  if (error) throw normalizeError(error);

  return data;
}

export async function getExpensesAPI({
  dateRange,
  minAmount,
  maxAmount,
  search,
  categories,
  page,
  signal,
}) {
  assertOnline();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let query = supabase
    .from("expenses")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .abortSignal(signal);
  if (dateRange && dateRange.start && dateRange.end) {
    const { start, end } = dateRange;
    query = query.gte("created_at", start).lt("created_at", end);
  }
  if (minAmount && isFinite(minAmount)) {
    query = query.gte("amount", 0);
  }
  if (maxAmount && isFinite(maxAmount)) {
    query = query.lte("amount", maxAmount);
  }
  if (search && search.length > 0) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }
  if (categories && categories.length > 0) {
    query = query.in("category", categories);
  }
  if (page && isFinite(page)) {
    const from = (page - 1) * 10;
    const to = page * 10 - 1;
    query = query.range(from, to);
  }
  const { data: expenses, count, error } = await query;
  if (error) {
    throw error;
  }
  return { expenses, count };
}

export async function getExpenseAPI(expenseId) {
  assertOnline();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: expense, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", expenseId);
  if (error) throw normalizeError(error);

  return expense.at(0);
}

export async function deleteExpenseAPI(expenseId) {
  assertOnline();
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  if (error) throw normalizeError(error);

  return true;
}

export async function updateExpenseAPI(expenseId, changedValues) {
  assertOnline();
  const { data, error } = await supabase
    .from("expenses")
    .update(changedValues)
    .eq("id", expenseId)
    .select();

  if (error) throw normalizeError(error);

  return data;
}
