import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
import SelectType from './pages/host/setAccommodations/SelectType';
import Chips from './assets/Chips';


function App() {
  return (
    <BrowserRouter>
    <SelectType/>
    <Chips text='테스트 할거라고 !!!!'/>
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




