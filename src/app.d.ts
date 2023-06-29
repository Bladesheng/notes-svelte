declare global {
  /// <reference types="@sveltejs/kit" />
  namespace App {
    interface Locals {
      auth: import("lucia-auth").AuthRequest;
      prisma: import("$lib/prisma").Prisma;
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
