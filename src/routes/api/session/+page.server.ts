import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { trimFormField, validateStr } from "$lib/functions";
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

    const errors: IErrors = {};

    if (!name || !password) {
      errors.desc = "Name, password or email is missing";
    }

    if (!validateStr(name, 5)) {
      errors.name = "Name needs to be at least 5 characters long";
    }

    if (!validateStr(password, 7)) {
      errors.password = "Password needs to be at least 7 characters long";
    }

    if (Object.keys(errors).length !== 0) {
      return fail(400, {
        name,

        errors,
      });
    }

    try {
      const key = await auth.useKey("name", name, password);
      const session = await auth.createSession(key.userId);
      locals.auth.setSession(session); // create session cookie
    } catch (err) {
      errors.name = "Username or password is incorrect";

      return fail(400, {
        name,

        errors,
      });
    }
  },

  destroy: async ({ locals }) => {
    const { session } = await locals.auth.validateUser();

    if (!session) return fail(401);

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null); // remove session cookie
  },
} satisfies Actions;
