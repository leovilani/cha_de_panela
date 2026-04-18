"use client";

import { useEffect, useState } from "react";

type QrCodeViewProps = {
  generateQrCode: (() => Promise<string>) | null;
  emptyLabel?: string;
};

export function QrCodeView({ generateQrCode, emptyLabel }: QrCodeViewProps) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!generateQrCode) return;

    let active = true;

    generateQrCode()
      .then((nextDataUrl) => {
        if (active) {
          setDataUrl(nextDataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setDataUrl("");
        }
      });

    return () => {
      active = false;
    };
  }, [generateQrCode]);

  return (
    <div className="flex items-center justify-center rounded-3xl border border-rose-100 bg-white p-4 sm:p-6">
      {!generateQrCode ? (
        <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-rose-50 px-6 text-center text-sm font-medium text-stone-500 sm:h-72 sm:w-72">
          {emptyLabel ?? "QR Code indisponível"}
        </div>
      ) : dataUrl ? (
        <img
          src={dataUrl}
          alt="QR Code PIX"
          className="h-56 w-56 object-contain sm:h-72 sm:w-72"
        />
      ) : (
        <div className="h-56 w-56 animate-pulse rounded-2xl bg-rose-50 sm:h-72 sm:w-72" />
      )}
    </div>
  );
}
