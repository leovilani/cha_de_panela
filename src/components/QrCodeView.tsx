"use client";

type QrCodeViewProps = {
  dataUrl: string;
};

export function QrCodeView({ dataUrl }: QrCodeViewProps) {
  return (
    <div className="flex items-center justify-center rounded-3xl border border-rose-100 bg-white p-6">
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="QR Code PIX"
          className="h-72 w-72 object-contain"
        />
      ) : (
        <div className="h-72 w-72 animate-pulse rounded-2xl bg-rose-50" />
      )}
    </div>
  );
}
