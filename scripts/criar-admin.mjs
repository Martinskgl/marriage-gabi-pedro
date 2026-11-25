// Cria (ou atualiza a senha de) um administrador do painel /admin.
// Uso: node --env-file=.env.local scripts/criar-admin.mjs <email> "<Nome>"
// A senha é pedida no terminal (não fica no histórico de comandos).
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const [email, name = "Administrador"] = process.argv.slice(2);
if (!email) {
  console.error('Uso: node --env-file=.env.local scripts/criar-admin.mjs <email> "<Nome>"');
  process.exit(1);
}

const rl = createInterface({ input: stdin, output: stdout });
const password = await rl.question("Senha do painel (mínimo 8 caracteres): ");
rl.close();
if (password.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}

const prisma = new PrismaClient();
try {
  const role =
    (await prisma.role.findFirst({ where: { name: "ADMIN" } })) ?? (await prisma.role.create({ data: { name: "ADMIN" } }));
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { name, password: hash, roleId: role.uuid },
    create: { email: email.toLowerCase(), name, password: hash, roleId: role.uuid },
  });
  console.log(`Administrador ${email.toLowerCase()} pronto. Entre em /login.`);
} finally {
  await prisma.$disconnect();
}
