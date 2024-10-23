import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './pages/search';
import Main from './pages/Main';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
import Management from './pages/host/Management';
import Host from './pages/host';
import ReservationCompleted from './pages/reservations/ReservationCompleted';
import CancelPopup from './pages/reservations/CancelPopup';
import SelectType from './pages/host/setAccommodations/SelectType';
import StructureType from './pages/host/setAccommodations/StructureType';
import MultiAccommodations from './pages/host/setAccommodations/MultiAccommodations';
import OnlyStaterRoom from './pages/host/setAccommodations/OnlyStaterRoom';
import MultiStaterRoom from './pages/host/setAccommodations/MultiStaterRoom';
import SignIn from './pages/user/SignIn';
import User from './pages/user';
import SignUp from './pages/user/SignUp';
import Mypage from './pages/user/Mypage';
import Reservations from './pages/reservations';
import ReservationCanceled from './pages/reservations/ResevationCanceled';
import HostDocuments from './pages/host/setAccommodations/HostDocuments';
import Documents from './pages/host/setAccommodations/components/Documents';
import EditMultiAccommodations from './pages/host/setAccommodations/EditMultiAccommodations';
import EditMultiRoom from './pages/host/setAccommodations/EditMultiRoom';
import EditOnlyRoom from './pages/host/setAccommodations/EditOnlyRoom';
import Popup from './components/Popup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations">
          <Route path=":accommodationId" element={<Accommodations />} />
          <Route
            path="stateroom/:accommodationId/:stateroomId"
            element={<Stateroom />}
          />
        </Route>

        <Route path="/mypage" element={<Mypage />} />
        {/* 유저관련 */}
        <Route path="/user" element={<User />}>
          <Route path="login" element={<SignIn />} />
          <Route path="join" element={<SignUp />} />
        </Route>
        {/* 호스트관련 */}

        <Route path="/host" element={<Host />}>
          <Route path="" element={<Management />} />
          <Route path="accommodation" element={<SelectType />} />
          <Route path="structure-taaaaype" element={<StructureType />} />
          <Route path="OnlyStaterRoom" element={<OnlyStaterRoom />} />
          <Route path="MultiAccommodations" element={<MultiAccommodations />} />
          <Route path="MultiStaterRoom" element={<MultiStaterRoom />} />
          <Route path="hostdocuments" element={<HostDocuments />} />
          <Route path="Documents" element={<Documents />} />
          <Route path="EditOnlyRoom" element={<EditOnlyRoom />} />
          <Route path="EditMultiRoom" element={<EditMultiRoom />} />
          <Route
            path="EditMultiAccommodations"
            element={<EditMultiAccommodations />}
          />
        </Route>

        {/* 게스트 예약관련 */}
        <Route path="/reservation" element={<Reservations />}>
          <Route path="stateroom/order" element={<Orders />} />
          <Route path="info/complete" element={<ReservationCompleted />} />
          <Route path="info/canceled" element={<ReservationCanceled />} />
          <Route path="cancelpopup" element={<CancelPopup />} />
        </Route>

        <Route path="/popup" element={<Popup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
