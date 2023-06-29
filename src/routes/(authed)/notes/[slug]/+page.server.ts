import { error, redirect } from "@sveltejs/kit";
import { trimFormField, validateStr } from "$lib/functions";
import type { Actions, PageServerLoad } from "./$types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function handleError(err: unknown) {
  if (err instanceof PrismaClientKnownRequestError) {
    throw error(404, "Note not found");
  }

  // instanceof doesn't work with HttpError thrown by the sveltekit error function,
  // so we have to check if it's HttpError like so:
  if (typeof err === "object" && err !== null && "status" in err) {
    throw err;
  }

  throw error(500, "Internal server error");
}

// check if the note exists and if the current user has acces to it
async function checkNote(
  noteId: number,
  userId: string,
  locals: App.Locals,
  errMessageMethod: string
) {
  const note = await locals.prisma.notes.findFirstOrThrow({
    where: {
      id: noteId,
    },
  });

  if (note.user_id !== userId) {
    throw error(403, `You are not authorized to ${errMessageMethod} this note`);
  }

  return note;
}

export const load: PageServerLoad = async ({ locals, params }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw error(401, "You need to be logged in to view your notes");
  }

  const noteId = parseInt(params.slug);

  try {
    const note = await checkNote(noteId, user.userId, locals, "view");

    return { note: note };
  } catch (err) {
    handleError(err);
  }
};

export const actions = {
  delete: async ({ locals, params }) => {
    const { user } = await locals.auth.validateUser();

    if (!user) {
      throw error(401, "You need to be logged in to view your notes");
    }

    const noteId = parseInt(params.slug);

    try {
      await checkNote(noteId, user.userId, locals, "delete");

      await locals.prisma.notes.delete({
        where: {
          id: noteId,
        },
      });
    } catch (err) {
      handleError(err);
    }

    throw redirect(303, "/notes");
  },

  edit: async ({ locals, params, request }) => {
    const { user } = await locals.auth.validateUser();

    if (!user) {
      throw error(401, "You need to be logged in to view your notes");
    }

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
      await checkNote(noteId, user.userId, locals, "edit");

      await locals.prisma.notes.update({
        where: {
          id: noteId,
        },
        data: {
          body: bodyTrimmed,
        },
      });
    } catch (err) {
      handleError(err);
    }
  },
} satisfies Actions;
