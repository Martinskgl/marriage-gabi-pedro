-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "paypalOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_paypalOrderId_key" ON "Transaction"("paypalOrderId");
