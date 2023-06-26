import { prisma } from "$lib/prisma";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const userId = 1;

  const noteId = parseInt(params.slug);

  try {
    const res = await prisma.notes.findFirstOrThrow({
      where: {
        id: noteId,
        user_id: userId,
      },
    });

    return { note: res };
  } catch (err) {
    throw error(404, {
      message: "Note not found",
    });
  }
};
