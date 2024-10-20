import { Outlet } from 'react-router-dom';
import Header, { labels } from '../../assets/Header';

export default function index() {
  const headerLabelArr: labels[] = [{ title: '로그인', link: '/user/login' }];
  return (
    <>
      <Header labels={headerLabelArr} />;
      <div className="mt-24 mb-11">
        <Outlet />
      </div>
    </>
  );
}
