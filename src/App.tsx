import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Popup from './components/Popup';


function App() {
  return (
    <BrowserRouter>
    <Popup title={'이것은 팝업'} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } subTitle={'팝업팝업팝업'} children={'야호'}/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
