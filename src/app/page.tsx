"use client";

import { useMemo, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { PixModal } from "@/components/PixModal";
import { items } from "@/data/items";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<(typeof items)[number] | null>(
    null,
  );

  const baseTxid = useMemo(
    () => process.env.NEXT_PUBLIC_TXID ?? "CHA-CASA-NOVA",
    [],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#fdf2f8_45%,_#fff_100%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-400">
            Lista de presentes
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Chá de casa nova de X &amp; Y
          </h1>
          <p className="max-w-2xl text-base text-stone-600 sm:text-lg">
            Escolha um presente e contribua via PIX. Cada item gera um QR Code
            único com o valor certinho.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
              formattedPrice={
                item.priceCents === null
                  ? "Qualquer valor"
                  : currencyFormatter.format(item.priceCents / 100)
              }
            />
          ))}
        </section>
      </main>

      <PixModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        baseTxid={baseTxid}
      />
    </div>
  );
}
