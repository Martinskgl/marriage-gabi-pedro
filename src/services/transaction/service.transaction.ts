import { prisma } from "@/lib/prisma";

export async function getAllTransaction() {
  return await prisma.transaction.findMany({
    include: {
      customer: { select: { name: true } },
      product: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateTransactionStatus(uuid: string, status: string) {
  return await prisma.transaction.update({
    where: { uuid },
    data: { status },
  });
}

export async function deleteTransactionByUuid(uuid: string) {
  // deleteMany não dá erro se o pedido já tiver sido excluído
  return await prisma.transaction.deleteMany({ where: { uuid } });
}
