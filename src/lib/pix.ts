type PixConfigInput = {
  city: string;
  key: string;
  name: string;
  txid: string;
};

const removeAccents = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const sanitizePixText = (value: string, maxLength: number) =>
  removeAccents(value)
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const sanitizeTxid = (value: string) =>
  removeAccents(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 25);

export function buildPixConfig({
  city,
  key,
  name,
  txid,
}: PixConfigInput) {
  const sanitizedKey = key.trim();
  const sanitizedName = sanitizePixText(name, 25);
  const sanitizedCity = sanitizePixText(city, 15);
  const sanitizedTxid = sanitizeTxid(txid);

  return {
    city: sanitizedCity,
    isValid:
      sanitizedKey.length > 0 &&
      sanitizedName.length > 0 &&
      sanitizedCity.length > 0 &&
      sanitizedTxid.length > 0,
    key: sanitizedKey,
    name: sanitizedName,
    txid: sanitizedTxid,
  };
}
