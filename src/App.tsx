import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './pages/search';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
import Management from './pages/host/Management';
import ReservationCompleted from './pages/reservations/ReservationCompleted';
import CancelPopup from './pages/reservations/CancelPopup';
import SelectType from './pages/host/setAccommodations/SelectType';
import StructureType from './pages/host/setAccommodations/StructureType';
import MultiAccommodations from './pages/host/setAccommodations/MultiAccommodations';
import OnlyStaterRoom from './pages/host/setAccommodations/OnlyStaterRoom';
import Popup from './components/Popup';
import IsReservationConfirmed from './pages/reservations/IsReservationComfirmed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/selecttype" element={<SelectType />} />
        <Route path="/structure-type" element={<StructureType />} />
        <Route path="/only-starter-room" element={<OnlyStaterRoom />} />
        <Route path="/multi-accommodations" element={<MultiAccommodations />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/stateroom" element={<Stateroom />} />
        <Route path="/stateroom/order" element={<Orders />} />
        <Route path="/host" element={<Management />}></Route>
        <Route
          path="/reservation/info/completed"
          element={<ReservationCompleted />}
        />
        <Route path="/reservation/cencel/popup" element={<CancelPopup />} />
        <Route path="/popup" element={<Popup />} />
        <Route
          path="/reservation/info/pending"
          element={<IsReservationConfirmed />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

