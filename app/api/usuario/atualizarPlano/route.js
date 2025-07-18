// app/api/usuario/atualizarPlano/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, plano } = await req.json();

    if (!userId || !["free", "basic", "pro"].includes(plano)) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { plano },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar plano:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
