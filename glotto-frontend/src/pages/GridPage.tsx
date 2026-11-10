import { useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap'; // Добавили Spinner
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchLanguages } from '../store/languagesSlice';
import { setSearchYear } from '../store/filterSlice';
import { LanguageCard } from '../components/LanguageCard';
import './GridPage.css';

export const GridPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.languages);
  const { searchYear } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(fetchLanguages(searchYear));
  }, [dispatch, searchYear]);

  return (
    <div className="grid-page">
      <h2>Все языки</h2>

      <Form.Control
        type="text"
        placeholder="Фильтр по году..."
        value={searchYear}
        onChange={(e) => dispatch(setSearchYear(e.target.value))}
        className="search-input"
        disabled={loading} // БЛОКИРУЕМ поле, пока идет загрузка
      />

      {/* АНИМАЦИЯ ЗАГРУЗКИ */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p>Загрузка данных...</p>
        </div>
      )}

      {error && <div className="text-danger">{error}</div>}

      {/* Показываем карточки, только если нет загрузки */}
      {!loading && (
        <div className="grid-container">
          {items.map(item => (
            <LanguageCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
