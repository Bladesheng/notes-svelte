import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { trimFormField, validateStr, validateEmail } from "$lib/functions";
import type { Actions } from "./$types";

export type IErrors = {
  desc?: string;
  name?: string;
  password?: string;
  email?: string;
};

export const actions = {
  create: async ({ request, locals }) => {
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
      const user = await auth.createUser({
        primaryKey: {
          providerId: "name",
          providerUserId: name,
          password,
        },
        attributes: {
          name,
        },
      });

      const session = await auth.createSession(user.userId);
      locals.auth.setSession(session); // create session cookie
    } catch (err) {
      errors.name = "Username is already taken";

      return fail(400, {
        name,
        email,

        errors,
      });
    }
  },
} satisfies Actions;
