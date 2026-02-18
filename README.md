# Casinha do Amor

This project is a simple, client-side gift list with PIX QR codes built to help me and my girlfriend avoid the fees charged by typical registry platforms. It was vibecoded with Codex and intentionally kept lean: no backend, no database, just a clean Next.js UI that generates BR Code payloads and QR codes in the browser.

## Tech stack

- Next.js (App Router, TypeScript)
- TailwindCSS
- Client-side PIX payload + QR generation

## Running locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Configuration

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_PIX_KEY=your-key-here
NEXT_PUBLIC_RECEIVER_NAME=YOUR NAME
NEXT_PUBLIC_CITY=YOUR CITY
NEXT_PUBLIC_TXID=CHA-CASA-NOVA
```

## Adding items

1) Add the image to `public/items/`
2) Add a new entry in `src/data/items.ts`

The list is fully data-driven so you only edit one file to add/remove items.
