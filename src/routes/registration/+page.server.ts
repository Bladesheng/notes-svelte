import { prisma } from "$lib/prisma";
import { error, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

import { trimFormField, validateStr, validateEmail } from "$lib/functions";

export type IErrors = {
  desc?: string;
  name?: string;
  password?: string;
  email?: string;
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const name = trimFormField(data.get("name"));
    const password = trimFormField(data.get("password"));
    const email = trimFormField(data.get("email"));

    const errors: IErrors = {};

    if (!name || !password || !email) {
      errors.desc = "Name, password or email is missing";
    }

    if (!validateStr(name, 5)) {
      errors.name = "Name needs to be at least 5 characters long";
    }

    if (!validateStr(password, 7)) {
      errors.password = "Password needs to be at least 7 characters long";
    }

    if (!validateEmail(email)) {
      errors.email = "Email needs to be valid email adress";
    }

    if (Object.keys(errors).length !== 0) {
      return fail(400, {
        name,
        email,

        errors,
      });
    }

    try {
      await prisma.users.create({
        data: {
          name,
          password,
          email,
        },
      });
    } catch (err) {
      console.error(err);
      throw error(500, "Internal server error");
    }
  },
} satisfies Actions;
