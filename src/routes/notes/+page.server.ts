import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { trimFormField, validateStr } from "$lib/functions";

const userId = 1;

export const load: PageServerLoad = async () => {
  const res = await prisma.notes.findMany({
    where: { user_id: userId },
  });

  return { notes: res };
};

export const actions: Actions = {
  create: async ({ request }) => {
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
      await prisma.notes.create({
        data: {
          body: bodyTrimmed,
          user_id: userId,
        },
      });
    } catch (err) {
      console.error(err);
      throw error(500, "Internal server error");
    }
  },
};
