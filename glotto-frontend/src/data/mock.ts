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
    attributes: [
      { name: "Языковая семья", value: "Индоевропейская" },
      { name: "Регион", value: "Восточная Европа" }
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
      { name: "Регион", value: "Британские острова" }
    ]
  },
  {
    id: 3,
    title: "Немецкий",
    description: "Список Сводеша для немецкого языка. Используется в сравнительно-историческом языкознании.",
    match_percent: 68,
    divergence_date: "500 г.",
    image_url: "https://flagcdn.com/w320/de.png",
    video_url: "",
    likes: 2,
    attributes: [
      { name: "Языковая семья", value: "Индоевропейская" },
      { name: "Регион", value: "Центральная Европа" }
    ]
  }
];
