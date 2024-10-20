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
import SignIn from './pages/user/SignIn';
import User from './pages/user';
import SignUp from './pages/user/SignUp';
import Mypage from './pages/user/Mypage';
import Reservations from './pages/reservations';
import ReservationCanceled from './pages/reservations/ResevationCanceled';
import HostAccomoList from './pages/host/hostCalender/HostAccmoList';
import HostCalendar from './pages/host/hostCalender/HostCalendar';
// ./components/Search 추가
import SearchComponent from './components/Search';
// ./components/cards/CardMain 추가
import CardMain from './components/cards/CardMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/selecttype" element={<SelectType />} />
        <Route path="/structure-type" element={<StructureType />} />
        <Route path="/only-starter-room" element={<OnlyStaterRoom />} />
        <Route path="/multi-accommodations" element={<MultiAccommodations />} />
        <Route path="/search" element={<Search />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/stateroom" element={<Stateroom />} />
        <Route path="/mypage" element={<Mypage />} />
        {/* 유저관련 */}
        <Route path="/user" element={<User />}>
          <Route path="login" element={<SignIn />} />
          <Route path="join" element={<SignUp />} />
        </Route>
        {/* 호스트관련 */}
        <Route path="/stateroom/order" element={<Orders />} />
        <Route path="/host" element={<Host />}>
          <Route path="" element={<Management />} />
          <Route path="accomo" element={<HostAccomoList />} />
          <Route path="accommodation" element={<SelectType />} />
          <Route path="structure-taaaaype" element={<StructureType />} />
          <Route path="only-starter-room" element={<OnlyStaterRoom />} />
          <Route path="multi-accommodations" element={<MultiAccommodations />} />
        </Route>
        {/* 게스트 예약관련 */}
        <Route path="/reservation" element={<Reservations />}>
          <Route path="info/complete" element={<ReservationCompleted />} />
          <Route path="info/canceled" element={<ReservationCanceled />} />
          <Route path="cancelpopup" element={<CancelPopup />} />
        </Route>

        {/* Search 라우트 추가 */}
        <Route path="/search-component" element={<SearchComponent />} />
        
        {/* CardMain 라우트 추가 */}
        <Route path="/card-main" element={<CardMain />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
