import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { APIError } from "better-auth/api"; 

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustHost: true,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const existingUserCount = await prisma.user.count();
          if (existingUserCount >= 1) {
            throw new APIError("FORBIDDEN", {
              message:
                "System limit reached.",
            });
          }
          return { data: user };
        },
      },
    },
  },
});
