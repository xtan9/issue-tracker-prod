import authConfig from "@/auth.config";
import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getTwoFactorConfirmationByUserId, getUserByID } from "./lib/data";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth providers bypass email verification.
      if (account?.type !== "credentials") return true;
      // Prevent signing in without email verification.
      const existingUser = await getUserByID(user.id);
      if (!existingUser?.emailVerified) return false;
      // Two factor auth.
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async jwt({ token }) {
      // Pass user role via token.
      const existingUser = await getUserByID(token.sub);
      if (existingUser) token.role = existingUser.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
