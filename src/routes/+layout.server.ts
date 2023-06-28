import type { LayoutServerLoad } from "./$types";

// so that UserMenu component has acces to user from anywhere
export const load: LayoutServerLoad = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  return { user };
};
