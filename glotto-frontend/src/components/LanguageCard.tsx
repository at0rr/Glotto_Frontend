import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { toggleLike, deleteLanguage } from '../store/languagesSlice';
import type { DsLanguageSerializer } from '../api/generated';

const DEFAULT_IMAGE = "https://via.placeholder.com/300x150?text=No+Image";

export const LanguageCard = ({ item }: { item: DsLanguageSerializer }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const canDelete = item.is_creator || (user && user.role === 2);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    const action = item.is_liked ? 0 : 1;
    dispatch(toggleLike({ id: item.id!, like: action }));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm("Удалить карточку?")) return;
    dispatch(deleteLanguage(item.id!));
  };

  return (
    <Card className="shadow-sm" style={{ width: '100%', border: 'none', borderRadius: '10px' }}>
      <Card.Img variant="top" src={item.image_url || DEFAULT_IMAGE} style={{ height: '110px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
      <Card.Body style={{ padding: '10px', background: '#F5F5F5' }}>
        <Card.Title style={{ fontSize: '15px', color: '#333', marginBottom: '5px' }}>{item.title} язык</Card.Title>
        <Card.Text style={{ fontSize: '13px', marginBottom: '5px', color: '#333' }}>Дата: {item.divergence_date}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#93358D', fontWeight: 'bold', cursor: isAuthenticated ? 'pointer' : 'default' }} onClick={handleLike}>
            {item.is_liked ? '❤️' : '🤍'} {item.likes}
          </div>
          {canDelete && (
            <button onClick={handleDelete} style={{ background: '#93358D', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '12px', cursor: 'pointer' }}>
              Удалить
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
