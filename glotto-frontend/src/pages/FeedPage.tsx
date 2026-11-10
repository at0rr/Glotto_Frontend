import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchFeed, toggleLike } from '../store/languagesSlice';
import './FeedPage.css';

const DEFAULT_VIDEO = "/videos/default.mp4";

export const FeedPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feedItem, loading } = useSelector((state: RootState) => state.languages);

  // Состояние для кнопки "Еще"
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchFeed({}));
    setIsExpanded(false); // Сбрасываем при переходе на новую карточку
  }, [dispatch]);

  if (!feedItem && loading) return <div className="p-4 text-center"><Spinner animation="border" /></div>;
  if (!feedItem) return <div className="p-4">Нет данных</div>;

  const handleNext = () => {
    dispatch(fetchFeed({ id: feedItem.id, next: true }));
    setIsExpanded(false); // Сбрасываем сворачивание при нажатии "Далее"
  };

  const handleLike = () => {
    const action = feedItem.is_liked ? 0 : 1;
    dispatch(toggleLike({ id: feedItem.id!, like: action }));
  };

  const attributes = (feedItem as any).attributes || [];

  return (
    <div className="feed-container">
      <video src={feedItem.video_url || DEFAULT_VIDEO} autoPlay muted loop playsInline className="feed-video" />

      <div className="feed-right-panel">
        <div className="likes-circle" onClick={loading ? undefined : handleLike} style={{cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.5 : 1}}>
          <span className="heart">{feedItem.is_liked ? '❤️' : '🤍'}</span>
          <span className="count">{feedItem.likes}</span>
        </div>
        <div className="info-box">
          <span className="value">{feedItem.match_percent}%</span>
          <span className="label">совпадений</span>
        </div>
        <div className="info-box">
          <span className="value">{feedItem.divergence_date}</span>
          <span className="label">расхождение</span>
        </div>
      </div>

      <div className="feed-overlay">
        <h2>{feedItem.title} язык</h2>

        {/* Блок описания с обрезкой */}
        <p
          className="desc"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : 3, // Показываем 3 строки, если свернуто
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {feedItem.description}
        </p>

        {/* Кнопка Еще/Скрыть */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: '#9FC9EA', fontWeight: 'bold', cursor: 'pointer', marginBottom: '8px', fontSize: '14px' }}
        >
          {isExpanded ? 'Скрыть' : 'Еще'}
        </div>

        {/* Атрибуты показываем только если развернуто (или можно всегда, как захочешь) */}
        {isExpanded && attributes.length > 0 && (
          <div className="attributes-block">
            {attributes.map((attr: any, idx: number) => (
              <div key={idx} className="attr-row">
                <strong>{attr.Attribute?.name || attr.attribute?.name}:</strong> {attr.Value || attr.value}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleNext} className="feed-next-btn" disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>
        {loading ? '...' : '→'}
      </button>
    </div>
  );
};
