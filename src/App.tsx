import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
import Header from './assets/Header';

function App() {
  return (
    <BrowserRouter>
      <Header labels={['게스트메인', '새 숙소 등록', '로그아웃']} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/stateroom" element={<Stateroom />} />
        <Route path="/stateroom/order" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


