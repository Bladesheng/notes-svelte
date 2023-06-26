import { prisma } from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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

    if (typeof body !== "string") {
      throw error(400, "No body was provided");
    }

    // validate input

    try {
      await prisma.notes.create({
        data: {
          body,
          user_id: userId,
        },
      });
    } catch (err) {
      console.error(err);
      throw error(500, "Internal server error");
    }
  },
};
