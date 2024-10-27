import { Outlet } from 'react-router-dom';
import Header from '../../assets/Header';

export default function index() {
  return (
    <>
      <Header />;
      <div className="mt-24 mb-11">
        <Outlet />
      </div>
    </>
  );
}
