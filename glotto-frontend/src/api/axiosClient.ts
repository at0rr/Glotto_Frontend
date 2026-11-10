import axios from 'axios';

// Создаем настроенный экземпляр axios
const axiosClient = axios.create({
  baseURL: '/', // Наш Vite-прокси сам перенаправит на 8080
});

// Добавляем перехватчик запросов (Interceptor)
axiosClient.interceptors.request.use((config) => {
  // Берем токен из LocalStorage (мы туда его сохраняли при логине)
  const token = localStorage.getItem('token');

  // Если токен есть, прикрепляем его в заголовок
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
