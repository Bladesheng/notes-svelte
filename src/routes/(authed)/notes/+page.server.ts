import { error } from "@sveltejs/kit";
import { trimFormField, validateStr } from "$lib/functions";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw error(401, "You need to be logged in to view your notes");
  }

  const res = await locals.prisma.notes.findMany({
    where: { user_id: user.userId },
  });

  return { notes: res };
};

export const actions = {
  create: async ({ locals, request }) => {
    const { user } = await locals.auth.validateUser();

    if (!user) {
      throw error(401, "You need to be logged create new notes");
    }

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
      await locals.prisma.notes.create({
        data: {
          body: bodyTrimmed,
          user_id: user.userId,
        },
      });
    } catch (err) {
      console.error(err);
      throw error(500, "Internal server error");
    }
  },
} satisfies Actions;
