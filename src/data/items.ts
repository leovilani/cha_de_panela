export type GiftItem = {
  id: string;
  title: string;
  priceCents: number | null;
  image: string;
  description?: string;
  contributed?: boolean;
  category: "eletrodomesticos" | "roupa_de_cama" | "outros" | "cozinha";
};

export const items: GiftItem[] = [
  {
    id: "qualquer-valor",
    title: "Escolha qualquer valor",
    priceCents: null,
    image: "/items/placeholder.svg",
    description: "Você decide o valor do presente.",
    category: "outros",
  },
  {
    id: "grill",
    title: "Grill Elétrico",
    priceCents: 27990,
    image: "/items/grill.png",
    category: "eletrodomesticos",
  },
  {
    id: "liquidificador",
    title: "Liquidificador",
    priceCents: 22991,
    image: "/items/liquidificador.png",
    category: "eletrodomesticos",
  },
  {
    id: "mixer",
    title: "Mixer",
    priceCents: 21990,
    image: "/items/mixer.png",
    contributed: false,
    category: "eletrodomesticos",
  },
  {
    id: "ferro-roupa",
    title: "Ferro de Passar",
    priceCents: 10900,
    image: "/items/ferro.png",
    contributed: false,
    category: "eletrodomesticos",
  },
  {
    id: "roupa-cama-fiorita",
    title: "Roupa de Cama | Fiorita",
    priceCents: 29400,
    image: "/items/milanoborboleta.webp",
    category: "roupa_de_cama",
  },
  {
    id: "roupa-cama-giordino",
    title: "Roupa de Cama | Giordino",
    priceCents: 29500,
    image: "/items/giordinomilano.webp",
    category: "roupa_de_cama",
  },
  {
    id: "roupa-cama-toscana",
    title: "Roupa de Cama | Toscana",
    priceCents: 29600,
    image: "/items/toscanamilano.webp",
    category: "roupa_de_cama",
  },
  {
    id: "jogo-panelas",
    title: "Jogo de Panelas",
    priceCents: 87621,
    image: "/items/panelasbrinox.webp",
    category: "cozinha",
  },
  {
    id: "aparelho-jantar",
    title: "Aparelho de Jantar",
    priceCents: 66990,
    image: "/items/aparelhodejantar.webp",
    category: "cozinha",
  },
  {
    id: "jogo-cumbucas",
    title: "Jogo de Cumbucas",
    priceCents: 22990,
    image: "/items/cumbucas.png",
    category: "cozinha",
    contributed: false,
  },
  {
    id: "copos",
    title: "Copos",
    priceCents: 10485,
    image: "/items/copo.png",
    category: "cozinha",
    contributed: false,
  },
  {
    id: "faqueiro",
    title: "Faqueiro",
    priceCents: 12990,
    image: "/items/faqueiro.webp",
    category: "cozinha",
  },
  {
    id: "ramekin",
    title: "Ramekin",
    priceCents: 5390,
    image: "/items/ramekin.webp",
    category: "cozinha",
  },
  {
    id: "porta-guardanapos",
    title: "Porta Guardanapos",
    priceCents: 3690,
    image: "/items/portaguardanapos.webp",
    category: "cozinha",
  },
  {
    id: "mandoline",
    title: "Mandoline",
    priceCents: 7999,
    image: "/items/mandoline.webp",
    category: "cozinha",
  },
  {
    id: "galheteiro",
    title: "Galheteiro",
    priceCents: 14990,
    image: "/items/galheteiro.webp",
    category: "cozinha",
  }
];
