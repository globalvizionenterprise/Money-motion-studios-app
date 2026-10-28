// MONEY MOTION STUDIOS — Beat Store catalog (Producers page).
// Each item: { id, title, producer, type: "Beat"|"Loop Kit"|"MIDI Kit"|"Pack",
//   bpm, key, price, from: true if the price is a starting price,
//   audio: preview file URL or "" (preview plays right on the page),
//   external: "" — if set, the buy button links out to that store instead
//   of running the BT-code checkout (used for producers selling on their
//   own site). Add Keyz's own beats/packs with audio + price and no
//   external link and they sell through the BT-code flow automatically. }
window.MM_BEATS = [
  // — Livin Legend Beatz: her catalog, sold on her own beat site —
  { id: "llb-ever-clear", title: "Ever Clear — Future Type Beat", producer: "Livin Legend Beatz", type: "Beat", bpm: 127, key: "Fm", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-valant-swag", title: "Valant Swag — Aggressive UK Drill Type Beat", producer: "Livin Legend Beatz", type: "Beat", bpm: 142, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-billoniare", title: "Billoniare — UK Drill Type Beat", producer: "Livin Legend Beatz", type: "Beat", bpm: 143, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-coco-caremel", title: "Coco Caremel — Smooth R&B Type Beat", producer: "Livin Legend Beatz", type: "Beat", bpm: 110, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-coastal-war", title: "Coastal War — Central Cee Drill Type Beat", producer: "Livin Legend Beatz", type: "Beat", bpm: 141, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-raiders-ark", title: "Raiders Ark", producer: "Livin Legend Beatz", type: "Beat", bpm: 140, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-velvet-nights", title: "Velvet Nights R&B Loop Kit", producer: "Livin Legend Beatz", type: "Loop Kit", bpm: 0, key: "", price: 5.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-trap-royalty", title: "Trap Royalty Vol 1", producer: "Livin Legend Beatz", type: "Sound Kit", bpm: 0, key: "", price: 9.99, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-lucid-free", title: "LUCID FREQUENCIES (FREE)", producer: "Livin Legend Beatz", type: "Sound Kit", bpm: 0, key: "", price: 0, from: false, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-lucid-loop", title: "Lucid Frequencies Loop Kit", producer: "Livin Legend Beatz", type: "Loop Kit", bpm: 0, key: "", price: 10, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-midi-free", title: "Producer Midi Pack (Free Version)", producer: "Livin Legend Beatz", type: "MIDI Kit", bpm: 0, key: "", price: 0, from: false, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" },
  { id: "llb-glaucus", title: "DA-GLAUCUS ONE SHOT", producer: "Livin Legend Beatz", type: "Sound Kit", bpm: 0, key: "", price: 5, from: true, audio: "", external: "https://spaceymusic.com/u/livinlegendbeatz" }
];
