import CardAccommodations from '../../components/cards/CardAccommodations';
import Layout2 from '../../layouts/Layout2';
export default function index() {
  return (
    <Layout2>
      <div className="grid grid-cols-2 gap-6 mb-14">
        <div className="grid grid-cols-3 gap-8 mt-5">
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations /> <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
          <CardAccommodations />
        </div>
        <div className="sticky h-screen bg-gray-200 border-2 border-solid rounded-md border-gray-50 top-5"></div>
      </div>
    </Layout2>
  );
}
