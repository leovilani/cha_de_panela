"use client";

import { useEffect, useMemo, useState } from "react";
import { Buffer } from "buffer";
import { QrCodePix } from "qrcode-pix";
import { GiftItem } from "@/data/items";
import { QrCodeView } from "@/components/QrCodeView";

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
  const [copied, setCopied] = useState(false);
  const [pixPayload, setPixPayload] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const isContributed = item?.contributed === true;

  useEffect(() => {
    if (!item) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  useEffect(() => {
    setCopied(false);
  }, [item, customAmountCents]);

  useEffect(() => {
    if (item?.priceCents === null) {
      setCustomAmountCents(0);
    }
  }, [item]);

  const amountCents = useMemo(() => {
    if (!item) return null;
    if (item.priceCents !== null) return item.priceCents;
    return customAmountCents;
  }, [customAmountCents, item]);

  const amountValue =
    amountCents !== null ? Number((amountCents / 100).toFixed(2)) : null;

  useEffect(() => {
    if (!item) {
      setPixPayload("");
      setPixQrCode("");
      return;
    }

    const key = process.env.NEXT_PUBLIC_PIX_KEY ?? "";
    const name = process.env.NEXT_PUBLIC_RECEIVER_NAME ?? "";
    const city = process.env.NEXT_PUBLIC_CITY ?? "";
    const txid = `${baseTxid}-${item.id}`.slice(0, 25);

    const qrCodePix = QrCodePix({
      version: "01",
      key,
      name,
      city,
      transactionId: txid,
      message: item.title,
      value: amountValue ?? undefined,
    });

    const payload = qrCodePix.payload();
    setPixPayload(payload);

    qrCodePix
      .base64()
      .then((base64) => setPixQrCode(base64))
      .catch(() => setPixQrCode(""));
  }, [amountValue, baseTxid, item]);

  if (!item) return null;

  const formattedAmount =
    amountCents !== null ? currencyFormatter.format(amountCents / 100) : "—";

  const handleCopy = async () => {
    if (!pixPayload) return;
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 px-4 py-10 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl rounded-[32px] p-6 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.7)] sm:p-8 ${
          isContributed ? "bg-stone-100" : "bg-white"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose-400">
                PIX do presente
              </p>
              <h2
                className={`text-2xl font-semibold ${
                  isContributed ? "text-stone-500" : "text-stone-900"
                }`}
              >
                {item.title}
              </h2>
              <p className="text-sm text-stone-500">
                {isContributed
                  ? "Este item ja foi contribuido."
                  : item.priceCents === null
                    ? "Defina o valor do presente."
                    : "Obrigado por contribuir!"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-stone-300 hover:text-stone-800"
            >
              Fechar
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className={isContributed ? "opacity-70 grayscale" : ""}>
              <QrCodeView dataUrl={pixQrCode} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-rose-100 bg-rose-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                  Valor
                </p>
                <p className="text-2xl font-semibold text-stone-900">
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
                    className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-lg font-semibold text-stone-900 outline-none transition focus:border-rose-400"
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
                  className="mt-2 h-28 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600"
                />
                <button
                  type="button"
                  onClick={isContributed ? onClose : handleCopy}
                  className="mt-3 w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                >
                  {copied
                    ? "Código copiado!"
                    : isContributed
                      ? "Fechar"
                      : "Copiar código PIX"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

