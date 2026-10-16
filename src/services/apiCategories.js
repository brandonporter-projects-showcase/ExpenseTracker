import { assertOnline } from "#lib/utils";
import supabase from "./supabase";

export async function getSmartCategories(description) {
  assertOnline();
  const { data, error } = await supabase.functions.invoke(
    "get-category-suggestion",
    {
      body: { description },
    },
  );
  if (error) {
    const errorBody = await error.context.json();
    throw errorBody;
  }
  const { classifications } = data;
  return classifications;
}
