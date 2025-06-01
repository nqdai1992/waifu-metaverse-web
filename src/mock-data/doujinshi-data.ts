import { IDoujinshiDetail } from "@/components/doujinshi/doujinshi-card/doujinshi-card";

export const popularItems: IDoujinshiDetail[] = [
  {
    id: 1,
    title:
      "[クロミ] 新作 異世界の出会いを大切にしました。ましたた。た。た。た。",
    thumbnail:
      "/mock/kuromi-isekai-deai.jpg",
    liked: false,
    pageTotal: 24,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 2,
    title: "[Scarlett Ann] JASHIN Reunion [English]",
    thumbnail: "/mock/scarlett-ann-jashin-reunion.jpg",
    liked: true,
    pageTotal: 32,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 3,
    title: "[COMICTOU] NakamotoAyaSeiyaku",
    thumbnail: "/mock/comictou-nakamoto-aya-seiyaku.jpg",
    liked: false,
    pageTotal: 18,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 4,
    title: "Werewolf [Tokoro Soku] Koi (Futari wa Precure)",
    thumbnail: "/mock/werewolf-koi-precure.png",
    liked: true,
    pageTotal: 28,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 5,
    title: "フリーレン 4",
    thumbnail: "/mock/frieren-4.jpg",
    liked: false,
    pageTotal: 22,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 6,
    title:
      "[Momonomi Plus (Momonomi)] Hahaoya Damasite Musume Tyoukyou [Digital]",
    thumbnail:
      "/mock/momonomi-plus-hahaoya-damasite.jpg",
    liked: false,
    pageTotal: 16,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 7,
    title:
      "[Over.J & Choi TaeYoung] Family with Benefits [Ch. 1- 49.5] [English] [The Blank] [On Hiatus]",
    thumbnail:
      "/mock/overj-choi-family-with-benefits.jpg",
    liked: false,
    pageTotal: 30,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
];

export const newUploads: IDoujinshiDetail[] = [
  ...popularItems.slice(0, 10),
  {
    id: 8,
    title:
      "[ie] Kouseinou AI Sexaroid  Highly Advanced Sex Android [English] [CarlJPTL]",
    thumbnail:
      "/mock/ie-kouseinou-ai-sexaroid.jpg",
    liked: true,
    pageTotal: 26,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 9,
    title: "Demon (♂) vs Angel (♂) Battle ",
    thumbnail: "/mock/demon-vs-angel-battle.jpg",
    liked: true,
    pageTotal: 26,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 10,
    title:
      "[Aweida] Iincho no Kuse ni Yuri Sex Chou Umakute Maji  Mukatsuku  She's Crazy Good at Yuri Sex Despite Being the Student President and it Seriously Pisses Me Off [English] [Pangean]    ",
    thumbnail:
      "/mock/aweida-iincho-yuri-sex.jpg",
    liked: false,
    pageTotal: 26,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 11,
    title: "[Hoshara] Seigi no Mikata！(Higuchi Kaede)",
    thumbnail: "/mock/hoshara-seigi-no-mikata.jpg",
    liked: false,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 12,
    title: "[Yuunabe Shinkouchuu (Tanabe Kyou)] Gakkou Tokidoki Sex Ya-san [Digital]  ",
    thumbnail: "/mock/yuunabe-gakkou-tokidoki-sex.jpg",
    liked: false,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    id: 13,
    title: "[Yuunabe Shinkouchuu (Tanabe Kyou)] Loli Combi Ecchi cat x vamp (Bakemonogatari) [Digital]   ",
    thumbnail: "/mock/yuunabe-loli-combi-ecchi-bakemonogatari.jpg",
    liked: true,
    pageTotal: 13,
    pages: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
];

export const mockListDetailDoujinshiPages = [
  '/mock/mock-detail/detail-1.png',
  '/mock/mock-detail/detail-2.png',
  '/mock/mock-detail/detail-3.png',
  '/mock/mock-detail/detail-4.png',
  '/mock/mock-detail/detail-5.png',
  '/mock/mock-detail/detail-6.png',
  '/mock/mock-detail/detail-7.png',
  '/mock/mock-detail/detail-8.png',
  '/mock/mock-detail/detail-9.png',
  '/mock/mock-detail/detail-10.png',
  '/mock/mock-detail/detail-11.png',
  '/mock/mock-detail/detail-12.png',
  '/mock/mock-detail/detail-13.png',
  '/mock/mock-detail/detail-14.png',
]
