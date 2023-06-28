import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/prisma";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

// * HOOKS
// RUNS ON EVERY REQUEST

export const authHook: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  return await resolve(event);
};

// this hook passes prisma instace to each action, load and endpoint
export const prismaHook: Handle = async ({ event, resolve }) => {
  event.locals.prisma = prisma;
  return await resolve(event);
};

// * END HOOKS

// Wraps requests in this sequence of hooks
export const handle: Handle = sequence(authHook, prismaHook);
