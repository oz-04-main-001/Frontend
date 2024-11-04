import { Outlet } from 'react-router-dom';
import Header, { labels } from '../../assets/Header';
import Layout from '../../layouts/Layout2';
<<<<<<< HEAD
=======
import useAuthStore from '../../stores/useAuthStore';

>>>>>>> 342ebf0 (CHOR: consolelog 주석 처리)
export default function index() {
  const headerLabelArr: labels[] = [
    { title: '게스트 메인', link: '/' },
    { title: '새 숙소 등록', link: '/host/select-type' },
  ];
  return (
    <Layout>
      <Header labels={headerLabelArr} />;
      <div className="mt-24">
        <Outlet />
      </div>
    </Layout>
  );
}
