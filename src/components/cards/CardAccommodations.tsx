export default function CardAccommodations({
  Accommodations = '서초아파트',
  price = 111,
}) {
  return (
    <div className="p-4 border-2 border-solid rounded-md border-gray-50">
      <div className="flex content-center justify-center w-full mb-4 overflow-hidden bg-gray-100 border-2 border-gray-100 border-solid rounded-md aspect-video">
        <img src="/staynest.svg" alt="logo" className="w-full" />
      </div>
      <div>
        <h6 className="mb-1">{Accommodations}</h6>
        <p className="text-gray-700 s2">
          {price} <span className="text-gray-400 c2"> /박</span>
        </p>
      </div>
    </div>
  );
}
