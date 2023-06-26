import { prisma } from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const user_id = 1;

export const load: PageServerLoad = async ({ params }) => {
  const noteId = parseInt(params.slug);

  try {
    const res = await prisma.notes.findFirstOrThrow({
      where: {
        id: noteId,
        user_id,
      },
    });

    return { note: res };
  } catch (err) {
    throw error(404, "Note not found");
  }
};

export const actions: Actions = {
  delete: async ({ params }) => {
    const noteId = parseInt(params.slug);

    try {
      await prisma.notes.delete({
        where: {
          id: noteId,
        },
      });
    } catch (err) {
      throw error(400, "No matching note was found");
    }

    throw redirect(303, "/notes");
  },
};
