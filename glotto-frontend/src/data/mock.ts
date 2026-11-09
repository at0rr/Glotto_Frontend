export interface Attribute {
  name: string;
  value: string;
}

export interface SwadeshItem {
  id: number;
  title: string;
  description: string;
  match_percent: number;
  divergence_date: string;
  image_url: string;
  video_url: string;
  likes: number;
  attributes: Attribute[];
}

export const MOCK_LANGUAGES: SwadeshItem[] = [
  {
    id: 1,
    title: "Русский",
    description: "Список Сводеша для русского языка, включающий 100 базовых понятий.",
    match_percent: 85,
    divergence_date: "1500 г.",
    image_url: "https://flagcdn.com/w320/ru.png",
    video_url: "/videos/russian.mp4",
    likes: 3,
    // Копируем данные из БД (2 атрибута)
    attributes: [
      { name: "Языковая семья", value: "Индоевропейская" },
      { name: "Размер списка", value: "100 слов" }
    ]
  },
  {
    id: 2,
    title: "Английский",
    description: "Базовый лексический список для английского языка.",
    match_percent: 72,
    divergence_date: "450 г.",
    image_url: "https://flagcdn.com/w320/gb.png",
    video_url: "/videos/english.mp4",
    likes: 2,
    attributes: [
      { name: "Языковая семья", value: "Индоевропейская" },
      { name: "Размер списка", value: "100 слов" }
    ]
  },
  {
    id: 3,
    title: "Немецкий",
    description: "Список Сводеша для немецкого языка.",
    match_percent: 68,
    divergence_date: "500 г.",
    image_url: "",
    video_url: "",
    likes: 2,
    attributes: [
      { name: "Языковая семья", value: "Индоевропейская" },
      { name: "Размер списка", value: "200 слов" } // Разнообразим данные
    ]
  }
];
