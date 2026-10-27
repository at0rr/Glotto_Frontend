import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MOCK_LANGUAGES } from '../data/mock';
import { LanguageCard } from '../components/LanguageCard';
import './GridPage.css';

export const GridPage = () => {
  const [searchYear, setSearchYear] = useState('');

  // Фильтрация по году расхождения
  const filteredLanguages = MOCK_LANGUAGES.filter(item => {
    if (searchYear === '') return true;
    return item.divergence_date.includes(searchYear);
  });

  return (
    <div className="grid-page">
      <h2>Все языки</h2>

      <Form.Control
        type="text"
        placeholder="Фильтр по году (например, 1500)..."
        value={searchYear}
        onChange={(e) => setSearchYear(e.target.value)}
        className="search-input"
      />

      {/* Просто сетка. Если пусто, она ничего не отрисует */}
      <div className="grid-container">
        {filteredLanguages.map(item => (
          <LanguageCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
