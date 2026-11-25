import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

/** Garante que quem chama é um administrador logado. Usado em todas as ações do painel. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("Não autorizado");
  return session;
}
