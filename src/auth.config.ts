import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 60 * 30,
  },
  // Guarda o papel (ADMIN) no token e na sessão para proteger o painel
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Email ou senha inválidos");

        return {
          id: user.uuid,
          email: user.email,
          name: user.name,
          role: user.role.name,
        };
      },
    }),
  ],
};
