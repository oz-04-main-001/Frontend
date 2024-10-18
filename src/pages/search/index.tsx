import CardAccommodations from '../../components/cards/CardAccommodations';
import Layout2 from '../../layouts/Layout2';
// import Map from './Map';
export default function index() {
  return (
    <Layout2>
      <div className="grid grid-cols-2 gap-6 mt-20 mb-14">
        <div className="grid grid-cols-3 gap-8">
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
        <div className="sticky h-screen overflow-hidden bg-gray-200 border-2 border-solid rounded-md border-gray-50 top-14">
          {/* <Map /> */}
        </div>
      </div>
    </Layout2>
  );
}
