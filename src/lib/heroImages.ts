// Hero background image pools (photos live in /public/GOTA2026).
// Consumed by <RandomHeroImage> to pick a fresh image on each page load.

const GOTA = '/GOTA2026';

// General pool: worship + study + welcome shots. Used on most hero sections.
export const GENERAL_HERO_IMAGES: string[] = [
  ...Array.from({ length: 15 }, (_, i) => `${GOTA}/worship${i + 1}.jpg`),
  ...Array.from({ length: 7 }, (_, i) => `${GOTA}/study${i + 1}.jpg`),
  ...Array.from({ length: 4 }, (_, i) => `${GOTA}/welcome${i + 1}.jpg`),
];

// Curated subset featuring children/teens. Used on the Children's and Student pages.
export const KID_TEEN_HERO_IMAGES: string[] = [
  `${GOTA}/youth1.jpg`,
  `${GOTA}/study1.jpg`,
  `${GOTA}/study3.jpg`,
  `${GOTA}/study7.jpg`,
  `${GOTA}/worship1.jpg`,
  `${GOTA}/worship4.jpg`,
  `${GOTA}/worship6.jpg`,
  `${GOTA}/worship7.jpg`,
  `${GOTA}/worship12.jpg`,
  `${GOTA}/worship13.jpg`,
];
