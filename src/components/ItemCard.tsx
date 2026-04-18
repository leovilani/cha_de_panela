"use client";

import Image from "next/image";
import { GiftItem } from "@/data/items";

type ItemCardProps = {
  item: GiftItem;
  onSelect: (item: GiftItem) => void;
  formattedPrice: string;
};

export function ItemCard({ item, onSelect, formattedPrice }: ItemCardProps) {
  const isContributed = item.contributed === true;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/70 text-left shadow-[0_20px_45px_-35px_rgba(0,0,0,0.65)] backdrop-blur transition hover:-translate-y-1 hover:border-rose-200/70 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 ${
        isContributed ? "opacity-50 grayscale" : ""
      }`}
    >
      <div className="relative h-44 w-full overflow-hidden bg-amber-50">
        {isContributed ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Contribuído
          </span>
        ) : null}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
        <p className="text-sm text-stone-500">
          {item.priceCents === null ? "Você escolhe o valor" : formattedPrice}
        </p>
      </div>
    </button>
  );
}

