import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Dropdown from './assets/Dropdown';
import Logo from './assets/logo'
import Counter from './assets/Counter';

function App() {
  return (
    <BrowserRouter>
    <Logo width='60px' height='60px' color='#778cd2'/>
    <Counter size={10}/>
      <Dropdown menuItems={['yejin','Kim yejin','puhaha','ddong','hahahahah']} width='250px' />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
