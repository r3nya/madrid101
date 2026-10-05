export type TelecomCategory = "major" | "alt" | "satellite";

export type TelecomGroup =
  | "Orange España"
  | "Telefónica"
  | "Vodafone"
  | "Digi"
  | "other";

export type TelecomService = "fiber" | "mobile" | "tv" | "satellite";

export type TelecomProvider = {
  name: string;
  url: string;
  category: TelecomCategory;
  /** Короткие пункты на русском */
  bullets: readonly string[];
  group?: TelecomGroup;
  services: readonly TelecomService[];
  /** Реферальная ссылка; note — текст на русском после ссылки */
  referral?: { href: string; note: string };
  /** description для LinkCard */
  cardDescription: string;
};

export const telecomCategories = [
  { id: "major", title: "Основные операторы" },
  { id: "alt", title: "Виртуальные и альтернативные операторы" },
  { id: "satellite", title: "Спутниковый интернет" },
] as const satisfies readonly { id: TelecomCategory; title: string }[];

/**
 * Все провайдеры продают частным клиентам в Мадриде (город и Комунидад).
 * Где покрытие фибры зависит от адреса — это указано в bullets.
 */
export const telecomProviders = [
  // --- Основные операторы ---
  {
    name: "Movistar",
    url: "https://www.movistar.es/",
    category: "major",
    group: "Telefónica",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Крупнейший оператор в Испании, собственная сеть оптоволокна",
      "Полный набор: интернет, ТВ, мобильная связь",
      "Высокое качество связи, но цены выше среднего",
      "Movistar Plus+ — основной вариант для футбола (LaLiga, Champions League), Формулы 1 и MotoGP, есть 4K",
    ],
    cardDescription: "Интернет, ТВ и мобильная связь",
  },
  {
    name: "Orange",
    url: "https://www.orange.es/",
    category: "major",
    group: "Orange España",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "С 8 июня 2026 Orange владеет 100% MasOrange",
      "С сентября 2026 корпоративный бренд — Orange España; коммерческие бренды (Orange, MásMóvil, Yoigo, Jazztel и др.) сохраняются",
      "Хорошее покрытие 5G, пакеты интернет + мобильная + ТВ",
    ],
    cardDescription: "Интернет, ТВ и мобильная связь",
  },
  {
    name: "Vodafone",
    url: "https://www.vodafone.es/",
    category: "major",
    group: "Vodafone",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Широкий выбор тарифов и пакеты с ТВ-каналами",
      "Хорошее покрытие в городах",
      "Есть специальные предложения для молодежи",
    ],
    cardDescription: "Интернет, ТВ и мобильная связь",
  },

  // --- Виртуальные и альтернативные ---
  {
    name: "MásMóvil",
    url: "https://www.masmovil.es/",
    category: "alt",
    group: "Orange España",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Бренд группы Orange España (бывший MasOrange)",
      "Работает на сетях группы Orange",
      "Привлекательные цены и простые тарифы",
    ],
    cardDescription: "Интернет и мобильная связь",
  },
  {
    name: "Yoigo",
    url: "https://www.yoigo.com/",
    category: "alt",
    group: "Orange España",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Бренд группы Orange España",
      "Собственная мобильная сеть плюс сеть Orange",
      "Простые тарифы, конкурентные цены",
      "Без длительных контрактов",
    ],
    cardDescription: "Интернет и мобильная связь",
  },
  {
    name: "Jazztel",
    url: "https://www.jazztel.com/",
    category: "alt",
    group: "Orange España",
    services: ["fiber", "mobile"],
    bullets: [
      "Бренд Orange с 2015 года, использует инфраструктуру Orange",
      "Конкурентные пакеты интернет + мобильная связь",
      "Известен агрессивными промо для новых клиентов",
      "Оптоволокно до 1 Гбит/с",
    ],
    cardDescription: "Интернет и мобильная связь",
  },
  {
    name: "Digi",
    url: "https://www.digimobil.es/",
    category: "alt",
    group: "Digi",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Уже не просто виртуальный оператор: собственный спектр и сеть 5G, плюс роуминг на сети Movistar там, где своей сети нет",
      "Собственная сеть оптоволокна",
      "Одни из самых низких цен на рынке",
      "Популярен среди экспатов: выгодные тарифы с международными звонками",
    ],
    cardDescription: "Интернет, мобильная связь и ТВ",
  },
  {
    name: "Lowi",
    url: "https://www.lowi.es/",
    category: "alt",
    group: "Vodafone",
    services: ["fiber", "mobile"],
    bullets: [
      "Лоукост-бренд Vodafone, работает на сети Vodafone",
      "Неиспользованные гигабайты накапливаются",
      "Простое управление через приложение, без долгосрочных контрактов",
    ],
    cardDescription: "Мобильная связь и интернет",
  },
  {
    name: "O2",
    url: "https://o2online.es/",
    category: "alt",
    group: "Telefónica",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Бренд Telefónica, работает на сети Movistar",
      "Дешевле Movistar при той же сети",
      "Без permanencia (контрактных обязательств)",
      "Простые тарифы без лишних услуг",
    ],
    cardDescription: "Интернет и мобильная связь",
  },
  {
    name: "Pepephone",
    url: "https://www.pepephone.com/",
    category: "alt",
    group: "Orange España",
    services: ["fiber", "mobile"],
    bullets: [
      "Известен качественной поддержкой клиентов",
      "Прозрачные тарифы без скрытых платежей",
      "Бренд группы Orange España (ранее MásMóvil)",
      "Мобильная связь и оптоволокно",
    ],
    referral: {
      href: "https://ppph.es/bosquepepe?mgm=T3MBQYNX",
      note: "обещают посадить дерево",
    },
    cardDescription: "Интернет и мобильная связь",
  },
  {
    name: "Simyo",
    url: "https://www.simyo.es/",
    category: "alt",
    group: "Orange España",
    services: ["fiber", "mobile"],
    bullets: [
      "Бренд Orange, работает на сети Orange",
      "Гибкий конструктор тарифов: выбираете точное количество минут и гигабайт",
      "Неиспользованные гигабайты накапливаются",
      "Без обязательств по сроку (кроме покупки телефона)",
    ],
    cardDescription: "Мобильная связь и оптоволокно",
  },
  {
    name: "Finetwork",
    url: "https://www.finetwork.es/",
    category: "alt",
    group: "Vodafone",
    services: ["fiber", "mobile"],
    bullets: [
      "Бренд Vodafone (finetwork.es) с июля 2026; с 10 октября 2026 старый оператор на finetwork.com не может использовать имя",
      "Работает на сети Vodafone",
      "Одни из самых низких цен на рынке",
      "Гигабайты можно накапливать и делиться с другими абонентами Finetwork",
    ],
    cardDescription: "Мобильная связь и оптоволокно",
  },
  {
    name: "Suop",
    url: "https://www.suop.es/",
    category: "alt",
    group: "other",
    services: ["fiber", "mobile"],
    bullets: [
      "Первый «совместный» (collaborative) оператор в Испании: бонусы за активность в сообществе",
      "Работает на сети Orange",
      "Простые тарифы без скрытых условий, без permanencia на мобильную связь",
    ],
    cardDescription: "Мобильная связь и интернет",
  },
  {
    name: "Adamo",
    url: "https://adamo.es/",
    category: "alt",
    group: "other",
    services: ["fiber", "mobile"],
    bullets: [
      "Специализируется на оптоволокне (до 1 Гбит/с), собственная сеть",
      "Фокус на пригороды и частный сектор, куда не доходят другие; часто единственный вариант быстрого интернета в урбанизациях",
      "Есть пакеты интернет + мобильная связь",
      "Покрытие в Мадриде и Комунидад зависит от адреса — проверьте на сайте",
    ],
    cardDescription: "Высокоскоростной интернет",
  },
  {
    name: "Lebara",
    url: "https://lebaraspain.es/",
    category: "alt",
    group: "Orange España",
    services: ["mobile"],
    bullets: [
      "Предоплаченные тарифы (prepago) без контракта и permanencia",
      "Фокус на международные звонки: в бонусы входят минуты на десятки стран",
      "Работает на мобильной сети группы Orange, есть 5G",
      "Только мобильная связь, без домашнего интернета",
    ],
    cardDescription: "Мобильная связь prepago",
  },
  {
    name: "Avatel",
    url: "https://avatel.es/",
    category: "alt",
    group: "other",
    services: ["fiber", "mobile", "tv"],
    bullets: [
      "Оператор оптоволокна (FTTH), исторически силен в сельских и пригородных зонах",
      "С июня 2026 оптовое соглашение с MasOrange: потенциальное покрытие около 95% домохозяйств Испании, включая крупные города",
      "Покрытие нужно проверять по конкретному адресу",
      "Есть пакеты с мобильной связью и ТВ (CLICtv)",
    ],
    cardDescription: "Оптоволокно, мобильная связь и ТВ",
  },

  // --- Спутниковый ---
  {
    name: "Starlink",
    url: "https://www.starlink.com/es",
    category: "satellite",
    group: "other",
    services: ["satellite"],
    bullets: [
      "Спутниковый интернет от SpaceX",
      "Решение для удаленных мест без оптоволокна",
      "Относительно дорогие оборудование и подписка",
      "Простая самостоятельная установка",
      "Можно использовать в разных местах (за доплату)",
    ],
    cardDescription: "Спутниковый интернет",
  },
] as const satisfies readonly TelecomProvider[];
