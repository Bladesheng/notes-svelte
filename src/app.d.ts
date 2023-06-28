declare global {
  namespace App {
    interface Locals {
      auth: import("lucia").AuthRequest;
      prisma: PrismaClient;
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
