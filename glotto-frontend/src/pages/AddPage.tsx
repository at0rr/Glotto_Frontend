import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const AddPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Проверяем, авторизован ли пользователь
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return; // Если гость, ничего не делаем

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      // Отправляем на бэкенд
      await axios.post('/api/swadesh-lists', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/grid'); // Переходим на плитку после создания
    } catch (err) {
      console.error('Ошибка при создании', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="p-4 text-center">Пожалуйста, войдите в систему, чтобы добавлять языки.</div>;
  }

  return (
    <div className="p-4" style={{ paddingBottom: '80px' }}>
      <h2 style={{ color: '#93358D', fontWeight: 'bold' }}>Добавить язык</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Название языка</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Флаг (картинка)</Form.Label>
          <Form.Control type="file" onChange={e => setImage((e.target as HTMLInputElement).files![0])} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Видео</Form.Label>
          <Form.Control type="file" onChange={e => setVideo((e.target as HTMLInputElement).files![0])} />
        </Form.Group>
        <Button type="submit" disabled={loading} className="w-100" style={{ background: '#93358D', border: 'none', padding: '12px' }}>
          {loading ? 'Сохранение...' : 'Сохранить черновик'}
        </Button>
      </Form>
    </div>
  );
};
