import { Link, useLocation } from 'react-router-dom';
import './BottomNavbar.css';

export const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        Лента
      </Link>
      <span className="nav-item disabled">Добавление</span>
      <Link to="/grid" className={`nav-item ${location.pathname === '/grid' ? 'active' : ''}`}>
        Плитка
      </Link>
      <span className="nav-item disabled">Вход</span>
    </div>
  );
};
