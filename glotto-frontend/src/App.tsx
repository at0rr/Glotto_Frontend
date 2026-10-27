import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FeedPage } from './pages/FeedPage';
import { GridPage } from './pages/GridPage';
import { BottomNavbar } from './components/BottomNavbar';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        width: '100%',          // Жестко задаем ширину
        maxWidth: '390px',
        margin: '0 auto',
        height: '100vh',
        position: 'relative',
        background: '#E5E5E5',  // Серый фон страницы
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
        <BottomNavbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
