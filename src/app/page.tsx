"use client";

import { useMemo, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { PixModal } from "@/components/PixModal";
import { items } from "@/data/items";

type Category =
  | "all"
  | "eletrodomesticos"
  | "roupa_de_cama"
  | "cozinha"
  | "banheiro"
  | "sala";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<(typeof items)[number] | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const baseTxid = useMemo(
    () => process.env.NEXT_PUBLIC_TXID ?? "CHA-CASA-NOVA",
    [],
  );

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);
  const availableItems = filteredItems.filter((item) => !item.contributed);
  const contributedItems = filteredItems.filter((item) => item.contributed);
  const sortedItems = [...availableItems, ...contributedItems];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#fdf2f8_45%,_#fff_100%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <header className="flex flex-col gap-3 text-center sm:gap-4 sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-400">
            Lista de presentes
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Chá de casa nova de Leo &amp; Isa
          </h1>
          <p className="max-w-2xl text-sm text-stone-600 sm:text-lg">
            Escolha um presente e contribua via PIX. Cada item gera um QR Code
            único com o valor certinho.
          </p>
        </header>

        <section className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { id: "all", label: "Tudo" },
            { id: "eletrodomesticos", label: "Eletrodomésticos" },
            { id: "roupa_de_cama", label: "Roupa de cama" },
            { id: "cozinha", label: "Cozinha" },
            { id: "banheiro", label: "Banheiro" },
            { id: "sala", label: "Sala" },
          ].map((option) => {
            const isActive = activeCategory === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveCategory(option.id as Category)}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  isActive
                    ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
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
        key={selectedItem?.id ?? "closed"}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        baseTxid={baseTxid}
      />
    </div>
  );
}

