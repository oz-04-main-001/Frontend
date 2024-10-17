import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Popup from './components/Popup';

function App() {
  return (
    <BrowserRouter>
      <Popup />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
