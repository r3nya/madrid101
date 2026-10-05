export type UtilityService = "electricity" | "gas";

export type UtilityProvider = {
  name: string;
  url: string;
  /** Короткие пункты на русском */
  bullets: readonly string[];
  services: readonly UtilityService[];
  /** Реферальная ссылка; note — текст на русском после ссылки */
  referral?: { href: string; note: string };
  /** description для LinkCard */
  cardDescription: string;
};

/**
 * Комерсиализадоры свободного рынка (mercado libre), которые продают
 * частным клиентам по всей полуостровной Испании, включая Мадрид.
 * Octopus Energy должен оставаться первым в списке.
 */
export const utilityProviders = [
  {
    name: "Octopus Energy",
    url: "https://octopusenergy.es/",
    services: ["electricity", "gas"],
    bullets: [
      "100% возобновляемая электроэнергия",
      "Прозрачное ценообразование",
      "Удобное приложение для управления услугами",
      "Хорошая служба поддержки",
    ],
    referral: {
      href: "https://share.octopusenergy.es/metal-leaf-749",
      note: "по 50 € каждой стороне",
    },
    cardDescription: "Электричество и газ",
  },
  {
    name: "Naturgy",
    url: "https://www.naturgy.es/",
    services: ["electricity", "gas"],
    bullets: [
      "Один из крупнейших поставщиков газа и электроэнергии в Испании",
      "Комбинированные тарифы газ + электричество",
      "Специальные тарифы для новых клиентов",
    ],
    cardDescription: "Газ и электричество",
  },
  {
    name: "Iberdrola",
    url: "https://www.iberdrola.es/",
    services: ["electricity", "gas"],
    bullets: [
      "Крупный поставщик электроэнергии",
      "Есть «зеленые» тарифы и тарифы со стабильной ценой",
      "Удобное приложение для управления услугами",
    ],
    cardDescription: "Электричество и газ",
  },
  {
    name: "Endesa",
    url: "https://www.endesa.com/",
    services: ["electricity", "gas"],
    bullets: [
      "Один из старейших поставщиков энергии в Испании",
      "Фиксированные тарифы",
      "Программа лояльности для постоянных клиентов",
    ],
    cardDescription: "Электричество и газ",
  },
  {
    name: "TotalEnergies",
    url: "https://totalenergies.es/",
    services: ["electricity", "gas"],
    bullets: [
      "Международная компания, в Испании работает с бывшей клиентской базой EDP",
      "Конкурентные тарифы на газ и электричество",
    ],
    cardDescription: "Газ и электричество",
  },
  {
    name: "Repsol",
    url: "https://www.repsol.es/",
    services: ["electricity", "gas"],
    bullets: [
      "Известный бренд в энергетике",
      "Скидки при подключении нескольких услуг",
    ],
    cardDescription: "Газ и электричество",
  },
  {
    name: "Gana Energía",
    url: "https://ganaenergia.com/",
    services: ["electricity", "gas"],
    bullets: [
      "Независимая комерсиализадора из Валенсии, работает по всей полуостровной Испании и Балеарам",
      "Без permanencia, контракт онлайн за несколько минут",
      "Три тарифа на свет: фиксированный 24 часа, по временным периодам и по рыночной цене",
      "Газ по себестоимости в зависимости от уровня потребления",
    ],
    cardDescription: "Электричество и газ",
  },
  {
    name: "Podo",
    url: "https://www.mipodo.com/",
    services: ["electricity", "gas"],
    bullets: [
      "100% онлайн-комерсиализадора, работает по всей Испании",
      "Без permanencia",
      "Фиксированные тарифы и тарифы по рыночной цене",
    ],
    cardDescription: "Электричество и газ",
  },
  {
    name: "Plenitude",
    url: "https://eniplenitude.es/",
    services: ["electricity", "gas"],
    bullets: [
      "Энергетическая компания группы Eni",
      "Работает во всех муниципалитетах полуостровной Испании и на Балеарах",
      "Фиксированная цена на 12 месяцев без permanencia или переменный тариф по рынку",
      "Электричество из возобновляемых источников, есть солнечные панели",
    ],
    cardDescription: "Электричество и газ",
  },
] as const satisfies readonly UtilityProvider[];
