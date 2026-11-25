import { listActiveGifts } from "@/services/gift/service.gift";

// Lista pública de presentes (sempre atual, sem cache)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gifts = await listActiveGifts();
    return Response.json({ ok: true, gifts });
  } catch {
    // Sem banco configurado ou indisponível: o site mostra "Aguardando mais informações"
    return Response.json({ ok: false, gifts: [] }, { status: 503 });
  }
}
