import { Routes, Route } from 'react-router-dom';
import { FeedPage } from './pages/FeedPage';
import { GridPage } from './pages/GridPage';
import { LoginPage } from './pages/LoginPage';
import { AddPage } from './pages/AddPage';
import { BottomNavbar } from './components/BottomNavbar';

function App() {
  return (
    <div style={{ maxWidth: '390px', margin: '0 auto', height: '100vh', position: 'relative', background: '#fff', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/grid" element={<GridPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add" element={<AddPage />} /> {/* <--- И ЭТО */}
      </Routes>
      <BottomNavbar />
    </div>
  );
}

export default App;
