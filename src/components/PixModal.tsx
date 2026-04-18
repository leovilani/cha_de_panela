"use client";

import { useEffect, useMemo, useState } from "react";
import { Buffer } from "buffer";
import { QrCodePix } from "qrcode-pix";
import { GiftItem } from "@/data/items";
import { QrCodeView } from "@/components/QrCodeView";
import { buildPixConfig } from "@/lib/pix";

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer ?? Buffer;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type PixModalProps = {
  item: GiftItem | null;
  onClose: () => void;
  baseTxid: string;
};

export function PixModal({ item, onClose, baseTxid }: PixModalProps) {
  const [customAmountCents, setCustomAmountCents] = useState(0);
  const [copiedPayload, setCopiedPayload] = useState<string | null>(null);
  const isContributed = item?.contributed === true;

  useEffect(() => {
    if (!item) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  const amountCents = useMemo(() => {
    if (!item) return null;
    if (item.priceCents !== null) return item.priceCents;
    return customAmountCents;
  }, [customAmountCents, item]);

  const amountValue =
    amountCents !== null ? Number((amountCents / 100).toFixed(2)) : null;

  const hasValidAmount =
    item !== null &&
    (item.priceCents !== null || customAmountCents > 0);

  const pixConfig = useMemo(() => {
    if (!item) return null;

    return buildPixConfig({
      key: process.env.NEXT_PUBLIC_PIX_KEY ?? "",
      name: process.env.NEXT_PUBLIC_RECEIVER_NAME ?? "",
      city: process.env.NEXT_PUBLIC_CITY ?? "",
      txid: `${baseTxid}-${item.id}`,
    });
  }, [baseTxid, item]);

  const qrCodePix = useMemo(() => {
    if (!item || !hasValidAmount || !pixConfig?.isValid) return null;

    return QrCodePix({
      version: "01",
      key: pixConfig.key,
      name: pixConfig.name,
      city: pixConfig.city,
      transactionId: pixConfig.txid,
      value: amountValue ?? undefined,
    });
  }, [amountValue, hasValidAmount, item, pixConfig]);

  const pixPayload = useMemo(() => qrCodePix?.payload() ?? "", [qrCodePix]);
  const isCopied = copiedPayload === pixPayload && pixPayload !== "";

  if (!item) return null;

  const formattedAmount =
    amountCents !== null ? currencyFormatter.format(amountCents / 100) : "—";

  const handleCopy = async () => {
    if (!pixPayload) return;

    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopiedPayload(pixPayload);
    } catch {
      setCopiedPayload(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 px-3 py-4 backdrop-blur sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-10"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`mx-auto w-full max-w-2xl rounded-[28px] p-4 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.7)] sm:rounded-[32px] sm:p-8 ${
          isContributed ? "bg-stone-100" : "bg-white"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-[0.3em] text-rose-400">
                PIX do presente
              </p>
              <h2
                className={`text-xl font-semibold sm:text-2xl ${
                  isContributed ? "text-stone-500" : "text-stone-900"
                }`}
              >
                {item.title}
              </h2>
              <p className="text-sm text-stone-500">
                {isContributed
                  ? "Este item já foi contribuído."
                  : item.priceCents === null
                    ? "Defina o valor do presente."
                    : "Obrigado por contribuir!"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-stone-300 hover:text-stone-800 sm:w-auto"
            >
              Fechar
            </button>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className={isContributed ? "opacity-70 grayscale" : ""}>
              <QrCodeView
                key={pixPayload || "empty"}
                generateQrCode={qrCodePix ? () => qrCodePix.base64() : null}
                emptyLabel={
                  hasValidAmount
                    ? "Confira a chave PIX, nome e cidade nas variáveis públicas."
                    : "Digite um valor acima de R$ 0,00 para gerar o QR Code."
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-rose-100 bg-rose-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                  Valor
                </p>
                <p className="text-xl font-semibold text-stone-900 sm:text-2xl">
                  {formattedAmount}
                </p>
              </div>

              {item.priceCents === null && (
                <div className="rounded-3xl border border-stone-200 bg-white p-4">
                  <label className="text-sm font-semibold text-stone-700">
                    Digite o valor (R$)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={currencyFormatter.format(customAmountCents / 100)}
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "");
                      const nextCents = digits === "" ? 0 : Number(digits);
                      setCustomAmountCents(nextCents);
                    }}
                    placeholder="0,00"
                    className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition focus:border-rose-400 sm:text-lg"
                  />
                </div>
              )}

              <div className="rounded-3xl border border-stone-200 bg-white p-4">
                <label className="text-sm font-semibold text-stone-700">
                  PIX copia e cola
                </label>
                <textarea
                  readOnly
                  value={pixPayload}
                  className="mt-2 h-24 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 p-3 text-[11px] text-stone-600 sm:h-28 sm:text-xs"
                />
                {!pixConfig?.isValid ? (
                  <p className="mt-2 text-xs text-rose-500">
                    Configure `NEXT_PUBLIC_PIX_KEY`, `NEXT_PUBLIC_RECEIVER_NAME`
                    e `NEXT_PUBLIC_CITY` com valores válidos.
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={isContributed ? onClose : handleCopy}
                  disabled={!isContributed && !pixPayload}
                  className="mt-3 w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                >
                  {isCopied
                    ? "Código copiado!"
                    : isContributed
                      ? "Fechar"
                      : pixPayload
                        ? "Copiar código PIX"
                        : "Digite um valor"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
