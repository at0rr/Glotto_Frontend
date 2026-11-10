import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { resetFilters } from '../store/filterSlice';
import axios from 'axios';
import './BottomNavbar.css';

export const BottomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Достаем состояние авторизации из Redux
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      // Запрос на выход (добавляет токен в blacklist)
      await axios.post('/api/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      // В любом случае очищаем Redux и фильтры
      dispatch(logout());
      dispatch(resetFilters());
      navigate('/login'); // Кидаем на страницу входа
    }
  };

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        Лента
      </Link>

      <Link to="/add" className={`nav-item ${location.pathname === '/add' ? 'active' : ''}`}>
        Добавление
      </Link>

      <Link to="/grid" className={`nav-item ${location.pathname === '/grid' ? 'active' : ''}`}>
        Плитка
      </Link>

      {/* Если авторизован — показываем кнопку Выход, иначе — ссылку на Вход */}
      {isAuthenticated ? (
        <button onClick={handleLogout} className="nav-item" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          Выход
        </button>
      ) : (
        <Link to="/login" className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
          Вход
        </Link>
      )}
    </div>
  );
};
