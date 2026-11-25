import "next-auth";
import "next-auth/jwt";

// Papel do usuário (ex.: "ADMIN") guardado no token e na sessão
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
