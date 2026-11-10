import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store';

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { login, password });
      const { access_token, user } = response.data.data || response.data;

      dispatch(loginSuccess({ token: access_token, user }));
      navigate('/');
    } catch (error) {
      alert('Ошибка входа. Проверьте логин и пароль.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#E5E5E5' }}>
      <Card style={{ width: '350px', border: 'none', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#93358D', fontWeight: 'bold' }}>Вход</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="w-100" style={{ background: '#93358D', border: 'none', padding: '10px', fontWeight: 'bold' }}>
              Войти
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
