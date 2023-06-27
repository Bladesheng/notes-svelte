import { prisma } from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { trimFormField, validateStr } from "$lib/functions";

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

  edit: async ({ params, request }) => {
    const noteId = parseInt(params.slug);

    const data = await request.formData();
    const body = data.get("body");

    if (typeof body === null) {
      throw error(400, "No body was provided");
    }

    const bodyTrimmed = trimFormField(body);

    if (!validateStr(bodyTrimmed)) {
      throw error(400, "Body needs to be at least 1 characters long");
    }

    try {
      await prisma.notes.update({
        where: {
          id: noteId,
        },
        data: {
          body: bodyTrimmed,
        },
      });
    } catch (err) {
      throw error(400, "No matching note was found");
    }
  },
};
