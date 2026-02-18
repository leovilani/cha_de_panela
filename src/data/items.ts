export type GiftItem = {
  id: string;
  title: string;
  priceCents: number | null;
  image: string;
  description?: string;
  contributed?: boolean;
};

export const items: GiftItem[] = [
  {
    id: "qualquer-valor",
    title: "Escolha qualquer valor",
    priceCents: null,
    image: "/items/placeholder.svg",
    description: "Você decide o valor do presente.",
  },
  {
    id: "grill",
    title: "Grill Elétrico",
    priceCents: 27990,
    image: "/items/grill.png",
  },
  {
    id: "liquidificador",
    title: "Liquidificador",
    priceCents: 22991,
    image: "/items/liquidificador.png",
  },
  {
    id: "mixer",
    title: "Mixer",
    priceCents: 21990,
    image: "/items/mixer.png",
    contributed: false,
  },
  {
    id: "ferro-roupa",
    title: "Ferro de Passar",
    priceCents: 10900,
    image: "/items/ferro.png",
    contributed: false,
  },
  {
    id: "roupa-cama-fiorita",
    title: "Roupa de Cama | Fiorita",
    priceCents: 29400,
    image: "/items/milanoborboleta.webp",
  },
  {
    id: "roupa-cama-giordino",
    title: "Roupa de Cama | Giordino",
    priceCents: 29500,
    image: "/items/giordinomilano.webp",
  },
  {
    id: "roupa-cama-toscana",
    title: "Roupa de Cama | Toscana",
    priceCents: 29600,
    image: "/items/toscanamilano.webp",
  }
];
