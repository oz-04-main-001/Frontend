import { Outlet } from 'react-router-dom';
import Header, { labels } from '../../assets/Header';
import Layout from '../../layouts/Layout2';

export default function index() {
  const headerLabelArr: labels[] = [{ title: '로그인', link: '/user/login' }];
  return (
    <Layout>
      <Header labels={headerLabelArr} />;
      <div className="mt-24 mb-11">
        <Outlet />
      </div>
    </Layout>
  );
}
