import { prisma } from "$lib/prisma";

declare global {
  namespace App {
    interface Locals {
      auth: import("lucia").AuthRequest;
      prisma: typeof prisma; // to get the exact same types as the prisma instance
    }
  }
}

/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type UserAttributes = {
      name: string;
    };
  }
}

export {};
