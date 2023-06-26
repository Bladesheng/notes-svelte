import { prisma } from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const userId = 1;

  const res = await prisma.notes.findMany({
    where: { user_id: userId },
  });

  return { notes: res };
};
