// app/sucesso/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SucessoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Carregando...");

  const plano = searchParams.get("plano");
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!plano || !userId) {
      setStatus("Dados inválidos.");
      return;
    }

    fetch("/api/usuario/atualizarPlano", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, plano }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar plano");
        return res.json();
      })
      .then(() => setStatus("Parabéns! Seu plano foi atualizado para: " + plano.toUpperCase()))
      .catch(() => setStatus("Erro ao atualizar o plano."));
  }, [plano, userId]);

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Pagamento confirmado!</h1>
      <p className="text-gray-700 text-lg">{status}</p>
      <button onClick={() => router.push("/painel")} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl">
        Ir para o Painel
      </button>
    </div>
  );
}
