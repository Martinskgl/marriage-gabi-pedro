import { prisma } from "@/lib/prisma";

/** Presentes ativos para a lista pública do site. */
export async function listActiveGifts() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    select: { uuid: true, name: true, description: true, price: true, image: true },
  });
  return products.map((p) => ({ ...p, price: Number(p.price) }));
}

/**
 * Registra o pedido de um convidado como "PENDING". O preço vem do banco (nunca do navegador)
 * e o convidado é identificado pelo e-mail.
 */
export async function createGiftOrder(input: { productId: string; name: string; email: string }) {
  const product = await prisma.product.findFirst({
    where: { uuid: input.productId, isActive: true },
    select: { uuid: true, price: true },
  });
  if (!product) return null;

  const customer = await prisma.customer.upsert({
    where: { email: input.email },
    update: { name: input.name },
    create: { name: input.name, email: input.email },
  });

  return prisma.transaction.create({
    data: {
      customerId: customer.uuid,
      productId: product.uuid,
      quantity: 1,
      totalPrice: product.price,
      status: "PENDING",
    },
    select: { uuid: true },
  });
}
