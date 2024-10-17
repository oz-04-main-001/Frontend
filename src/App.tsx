
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


