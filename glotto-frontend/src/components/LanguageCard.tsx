import { Card } from 'react-bootstrap';
import type { SwadeshItem } from '../data/mock';

const DEFAULT_IMAGE = "https://via.placeholder.com/300x150?text=No+Image";

export const LanguageCard = ({ item }: { item: SwadeshItem }) => {
  return (
    <Card
      className="shadow-sm"
      style={{ width: '100%', border: 'none', borderRadius: '10px' }}
    >
      <Card.Img
        variant="top"
        src={item.image_url || DEFAULT_IMAGE}
        style={{ height: '110px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
      />
      <Card.Body style={{ padding: '10px', background: '#F5F5F5' }}>
        <Card.Title style={{ fontSize: '15px', color: '#333', marginBottom: '5px' }}>
          {item.title} язык
        </Card.Title>
        <Card.Text style={{ fontSize: '13px', marginBottom: '5px', color: '#333' }}>
          Дата: {item.divergence_date}
        </Card.Text>
        <div style={{ fontSize: '13px', color: '#93358D', fontWeight: 'bold' }}>
          ❤️ {item.likes}
        </div>
      </Card.Body>
    </Card>
  );
};
