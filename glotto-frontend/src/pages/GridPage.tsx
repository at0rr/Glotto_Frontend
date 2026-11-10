import { useEffect, useState } from 'react';
import { Spinner, Button, InputGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchLanguages } from '../store/languagesSlice';
import { setSearchYear } from '../store/filterSlice';
import { LanguageCard } from '../components/LanguageCard';
import './GridPage.css';

// Наш список годов (из моков или базы). Включает -2000.
const AVAILABLE_YEARS = ["1500", "450", "500", "600", "300", "-2000", "2024"];

export const GridPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.languages);
  const { searchYear } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(fetchLanguages(searchYear));
  }, [dispatch, searchYear]);

  const handleShowAll = () => {
    dispatch(setSearchYear(''));
  };

  return (
    <div className="grid-page">
      <h2>Все языки</h2>

      {/* Строка фильтра */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>

        {/* Выпадающий список вместо календаря */}
        <Form.Select
          value={searchYear}
          onChange={(e) => dispatch(setSearchYear(e.target.value))}
          disabled={loading}
          style={{
            borderRadius: '8px',
            border: '2px solid #9FC9EA',
            fontWeight: 'bold',
            color: searchYear ? '#333' : '#888'
          }}
        >
          <option value="">Все годы</option>
          {AVAILABLE_YEARS.map(year => (
            <option key={year} value={year}>
              {year === "-2000" ? "2000 г. до н.э." : `${year} г.`}
            </option>
          ))}
        </Form.Select>

        {/* Кнопка в стиле меню */}
        <Button
          onClick={handleShowAll}
          style={{
            background: '#93358D',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '0 15px'
          }}
        >
          Сбросить
        </Button>
      </div>

      {loading && <div className="text-center my-4"><Spinner animation="border" /></div>}
      {error && <div className="text-danger">{error}</div>}

      {!loading && items.length === 0 && (
        <div className="text-center text-muted mt-5">По вашему запросу ничего не найдено.</div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid-container">
          {items.map(item => (
            <LanguageCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
