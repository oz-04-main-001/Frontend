import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './pages/search';
import Main from './pages/Main';
import Accommodations from './pages/room/Accommodations';
import Stateroom from './pages/room/Stateroom';
import Orders from './pages/room/Orders';
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
import EditMultiAccommodations from './pages/host/setAccommodations/EditMultiAccommodations';
import EditMultiRoom from './pages/host/setAccommodations/EditMultiRoom';
import EditOnlyRoom from './pages/host/setAccommodations/EditOnlyRoom';
import OnlyAccommodation from './pages/host/setAccommodations/OnlyAccommodation';
import Popup from './components/Popup';
import MembershipWithdrawal from './pages/user/MembershipWithdrawal';
import HostMain from './pages/host/HostMain';
import SignOut from './pages/user/SignOut';
import EmailVerification from "./pages/user/EmailVerification";
import SignUpSuccessful from "./pages/user/SignUpSuccessful"; 

function App() {
  const handleClose = () => {
    console.log('팝업 닫기');
  }
  
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
          <Route path="leaveId" element={<MembershipWithdrawal />} />
          <Route path="logout" element={<SignOut />} />
          <Route path="verify-email" element={<EmailVerification onClose={handleClose} />} />
          <Route path="signup-successful" element={<SignUpSuccessful />} /> 
        </Route>

        {/* 호스트관련 */}
        <Route path="/host" element={<Host />}>
          <Route path="" element={<HostMain />} />
          <Route path="select-type" element={<SelectType />} />
          <Route path="structure-type" element={<StructureType />} />
        </Route>
        
        {/*호스트 숙소,객실관련*/}
        <Route path="/onlyhost">
          <Route path="host-documents" element={<HostDocuments />} />
          <Route path="only-accommodation" element={<OnlyAccommodation />} />
          <Route path="only-staterroom" element={<OnlyStaterRoom />} />
          <Route path="multi-accommodations" element={<MultiAccommodations />} />
          <Route path="multi-staterroom" element={<MultiStaterRoom />} />
          <Route path="edit-Onlyroom" element={<EditOnlyRoom />} />
          <Route path="edit-multiroom" element={<EditMultiRoom />} />
          <Route path="edit-multiaccommodations" element={<EditMultiAccommodations />} />
        </Route>

        {/* 게스트 예약관련 */}
        <Route path="/reservation" element={<Reservations />}>
          <Route
            path="stateroom/order/:accommodationId/:stateroomId"
            element={<Orders />}
          />
          <Route
            path="stateroom/order/info/:orderId"
            element={<ReservationCompleted />}
          />
          <Route path="info/canceled" element={<ReservationCanceled />} />
          <Route path="cancelpopup" element={<CancelPopup />} />
        </Route>

        <Route path="/popup" element={<Popup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
