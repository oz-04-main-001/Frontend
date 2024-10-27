import { Outlet } from 'react-router-dom';
import Header from '../../assets/Header';
import Layout from '../../layouts/Layout2';

export default function index() {
  return (
    <Layout>
      <Header />;
      <div className="mt-24">
        <Outlet />
      </div>
    </Layout>
  );
}
