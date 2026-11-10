import { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchDraft, createLanguage, publishLanguage } from '../store/languagesSlice';

export const AddPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { draftItem, loading } = useSelector((state: RootState) => state.languages);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDraft());
    }
  }, [isAuthenticated, dispatch]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    dispatch(createLanguage(formData)).then(() => {
      dispatch(fetchDraft());
    });
  };

  const handlePublish = () => {
    if (draftItem?.id) {
      dispatch(publishLanguage(draftItem.id)).then(() => {
        navigate('/grid');
      });
    }
  };

  if (!isAuthenticated) return <div className="p-4 text-center mt-5">Войдите в систему</div>;
  if (loading) return <div className="p-4 text-center mt-5"><Spinner animation="border" /></div>;

  if (draftItem) {
    return (
      <div className="p-4">
        <h2 style={{ color: '#93358D' }}>Ваш черновик</h2>
        <p>Название: {draftItem.title}</p>
        <Button onClick={handlePublish} className="w-100 mt-4" style={{ background: '#195DE1' }}>Опубликовать</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 style={{ color: '#93358D' }}>Добавить язык</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={e => setImage((e.target as HTMLInputElement).files![0])} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={e => setVideo((e.target as HTMLInputElement).files![0])} />
        </Form.Group>
        <Button type="submit" className="w-100" style={{ background: '#93358D' }}>Сохранить черновик</Button>
      </Form>
    </div>
  );
};
