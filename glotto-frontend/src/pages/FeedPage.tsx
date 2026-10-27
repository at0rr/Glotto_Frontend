import { useState } from 'react';
import { MOCK_LANGUAGES } from '../data/mock';
import './FeedPage.css';

const DEFAULT_VIDEO = "/videos/default.mp4";

export const FeedPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = MOCK_LANGUAGES[currentIndex];

  const handleNext = () => {
    if (currentIndex < MOCK_LANGUAGES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="feed-container">
      <video
        src={currentItem.video_url || DEFAULT_VIDEO}
        autoPlay muted loop playsInline
        className="feed-video"
      />

      {/* Правая колонка: Лайк сверху, под ним % и Дата */}
      <div className="feed-right-panel">
        <div className="likes-circle">
          <span className="heart">❤️</span>
          <span className="count">{currentItem.likes}</span>
        </div>

        <div className="info-box">
          <span className="value">{currentItem.match_percent}%</span>
          <span className="label">совпадений</span>
        </div>

        <div className="info-box">
          <span className="value">{currentItem.divergence_date}</span>
          <span className="label">расхождение</span>
        </div>
      </div>

      {/* Оверлей снизу (прижат к навигации) */}
      <div className="feed-overlay">
        <h2>{currentItem.title} язык</h2>
        <p className="desc">{currentItem.description}</p>

        {currentItem.attributes.length > 0 && (
          <div className="attributes-block">
            {currentItem.attributes.map((attr, idx) => (
              <div key={idx} className="attr-row">
                <strong>{attr.name}:</strong> {attr.value}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка Далее (справа, над навигацией) */}
      <button onClick={handleNext} className="feed-next-btn">→</button>
    </div>
  );
};
