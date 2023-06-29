import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./notes/$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw error(401, "You need to be logged in to view your notes");
  }
};
