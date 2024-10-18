import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
import Header from './assets/Header';
import ReservationCompleted from './pages/reservations/ReservationCompleted';
import CancelPopup from './pages/reservations/CancelPopup'
import SelectType from './pages/host/setAccommodations/SelectType';
import StructureType from './pages/host/setAccommodations/StructureType';
import MultiAccommodations from './pages/host/setAccommodations/MultiAccommodations';
import OnlyStaterRoom from './pages/host/setAccommodations/OnlyStaterRoom';


function App() {
  return (
    <BrowserRouter>
      <Header labels={['게스트메인', '새 숙소 등록', '로그아웃']} />
      <Routes>
        <Route path="/" element={<SelectType />} />
        <Route path='/structure-type' element={<StructureType/>} />
        <Route path='/only-starter-room'element={<OnlyStaterRoom/>} />
        <Route path='/multi-accommodations' element={<MultiAccommodations/>}/>
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/stateroom" element={<Stateroom />} />
        <Route path="/stateroom/order" element={<Orders />} />
        <Route
          path="/reservation/Info/completed"
          element={<ReservationCompleted />}
        />
        <Route path="/reservation/cencel/popup" element={<CancelPopup />} />
      </Routes>
    </BrowserRouter>
  );
}

