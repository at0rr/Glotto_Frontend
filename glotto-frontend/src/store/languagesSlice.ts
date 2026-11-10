import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LanguagesApi } from '../api/generated';
import type { DsLanguageSerializer, DsFeedSerializer } from '../api/generated';
import axiosClient from '../api/axiosClient';
import { MOCK_LANGUAGES } from '../data/mock';

// Инициализируем API с нашим axiosClient (чтобы токен подставлялся автоматически)
const api = new LanguagesApi(undefined, '', axiosClient);

// 1. Thunk для загрузки ПЛИТКИ (список с фильтром)
export const fetchLanguages = createAsyncThunk(
  'languages/fetch',
  async (searchYear: string) => {
    try {
      const response = await api.apiSwadeshListsGet(
        'year',
        searchYear ? Number(searchYear) : undefined
      );
      return response.data;
    } catch (error) {
      console.warn("Бэкенд недоступен, используем моки для плитки");
      return MOCK_LANGUAGES as any;
    }
  }
);

// 2. Thunk для загрузки ЛЕНТЫ (одна карточка)
export const fetchFeed = createAsyncThunk(
  'languages/fetchFeed',
  async ({ id, next }: { id?: number; next?: boolean }) => {
    try {
      const response = await api.apiSwadeshListsFeedGet(id, next);
      return response.data;
    } catch (error) {
      console.warn("Бэкенд недоступен, используем моки для ленты");
      // Fallback: если есть текущий ID, ищем следующий. Если нет - берем первый.
      if (id) {
        const currentIndex = MOCK_LANGUAGES.findIndex(m => m.id === id);
        const nextIndex = (currentIndex + 1) % MOCK_LANGUAGES.length;
        return MOCK_LANGUAGES[nextIndex] as any;
      }
      return MOCK_LANGUAGES[0] as any;
    }
  }
);

// 3. Thunk для лайка
export const toggleLike = createAsyncThunk(
  'languages/toggleLike',
  async ({ id, like }: { id: number; like: number }) => {
    try {
      // Передаем like в теле запроса (через data)
      await api.apiSwadeshListsIdLikePost(id, { data: { like } });
    } catch (error) {
      console.warn("Бэкенд недоступен, лайк не сохранится в БД");
    }
    return { id, like };
  }
);

// 4. Thunk для удаления карточки
export const deleteLanguage = createAsyncThunk(
  'languages/delete',
  async (id: number) => {
    await api.apiSwadeshListsIdDelete(id);
    return id;
  }
);

interface LanguagesState {
  items: DsLanguageSerializer[]; // Для Плитки
  feedItem: DsFeedSerializer | null; // Для Ленты
  loading: boolean;
  error: string | null;
}

const initialState: LanguagesState = {
  items: [],
  feedItem: null,
  loading: false,
  error: null,
};

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- ПЛИТКА ---
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })

      // --- ЛЕНТА ---
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feedItem = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка ленты';
      })

      // --- УДАЛЕНИЕ ---
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        // Удаляем карточку из стейта, чтобы не перезагружать страницу
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { id, like } = action.payload;
        const isLiked = like === 1;
        const likesDelta = isLiked ? 1 : -1;

        // Обновляем в Ленте
        if (state.feedItem && state.feedItem.id === id) {
          state.feedItem.is_liked = isLiked;
          state.feedItem.likes = Math.max(0, (state.feedItem.likes || 0) + likesDelta);
        }

        // Обновляем в Плитке
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.is_liked = isLiked;
          item.likes = Math.max(0, (item.likes || 0) + likesDelta);
        }
      });
  },
});

export default languagesSlice.reducer;
