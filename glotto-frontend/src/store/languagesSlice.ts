import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LanguagesApi } from '../api/generated';
import type { DsLanguageSerializer, DsFeedSerializer } from '../api/generated';
import axiosClient from '../api/axiosClient';
import { MOCK_LANGUAGES } from '../data/mock';

const api = new LanguagesApi(undefined, '', axiosClient);

// 1. GET Список (с фильтром)
export const fetchLanguages = createAsyncThunk(
  'languages/fetch',
  async (searchYear: string) => {
    try {
      const response = await api.apiSwadeshListsGet('year', searchYear ? Number(searchYear) : undefined);
      return response.data;
    } catch (error) {
      console.warn("Бэкенд недоступен, моки для плитки");
      return MOCK_LANGUAGES as any;
    }
  }
);

// 2. GET Лента
export const fetchFeed = createAsyncThunk(
  'languages/fetchFeed',
  async ({ id, next }: { id?: number; next?: boolean }) => {
    try {
      const response = await api.apiSwadeshListsFeedGet(id, next);
      return response.data;
    } catch (error) {
      console.warn("Бэкенд недоступен, моки для ленты");
      if (id) {
        const currentIndex = MOCK_LANGUAGES.findIndex(m => m.id === id);
        const nextIndex = (currentIndex + 1) % MOCK_LANGUAGES.length;
        return MOCK_LANGUAGES[nextIndex] as any;
      }
      return MOCK_LANGUAGES[0] as any;
    }
  }
);

// 3. GET Черновик
export const fetchDraft = createAsyncThunk(
  'languages/fetchDraft',
  async () => {
    const response = await api.apiSwadeshListsDraftGet();
    return response.data;
  }
);

// 4. POST Создание услуги (с файлами)
export const createLanguage = createAsyncThunk(
  'languages/create',
  async (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as File || undefined;
    const video = formData.get('video') as File || undefined;

    const response = await api.apiSwadeshListsPost(title, image, video);
    return response.data;
  }
);

// 5. PUT Публикация
export const publishLanguage = createAsyncThunk(
  'languages/publish',
  async (id: number) => {
    const response = await api.apiSwadeshListsIdPublishPut(id);
    return response.data;
  }
);

// 6. DELETE Удаление
export const deleteLanguage = createAsyncThunk(
  'languages/delete',
  async (id: number) => {
    await api.apiSwadeshListsIdDelete(id);
    return id;
  }
);

// 7. POST Лайк
export const toggleLike = createAsyncThunk(
  'languages/toggleLike',
  async ({ id, like }: { id: number; like: number }) => {
    try {
      await api.apiSwadeshListsIdLikePost(id, { data: { like } });
    } catch (error) {
      console.warn("Бэкенд недоступен, лайк не сохранится");
    }
    return { id, like };
  }
);

interface LanguagesState {
  items: DsLanguageSerializer[];
  feedItem: DsFeedSerializer | null;
  draftItem: DsLanguageSerializer | null;
  loading: boolean;
  error: string | null;
}

const initialState: LanguagesState = {
  items: [],
  feedItem: null,
  draftItem: null,
  loading: false,
  error: null,
};

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    clearDraft: (state) => { state.draftItem = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => { state.loading = true; })
      .addCase(fetchLanguages.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchFeed.fulfilled, (state, action) => { state.feedItem = action.payload; })
      .addCase(fetchDraft.fulfilled, (state, action) => { state.draftItem = action.payload; })
      .addCase(fetchDraft.rejected, (state) => { state.draftItem = null; })
      .addCase(createLanguage.fulfilled, (state) => { state.loading = false; })
      .addCase(publishLanguage.fulfilled, (state) => { state.draftItem = null; })
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { id, like } = action.payload;
        const isLiked = like === 1;
        const likesDelta = isLiked ? 1 : -1;

        if (state.feedItem && state.feedItem.id === id) {
          state.feedItem.is_liked = isLiked;
          state.feedItem.likes = Math.max(0, (state.feedItem.likes || 0) + likesDelta);
        }
        const item = state.items.find(i => i.id === id);
        if (item) {
          item.is_liked = isLiked;
          item.likes = Math.max(0, (item.likes || 0) + likesDelta);
        }
      });
  },
});

export const { clearDraft } = languagesSlice.actions;
export default languagesSlice.reducer;
