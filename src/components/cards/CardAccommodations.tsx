import { useNavigate } from 'react-router-dom';
import useErrorImage from '../../customHooks/useErrorImage';

interface CardAccommodationsProp {
  id?: string | number;
  location?: number[];
  lowestPrice?: string | number;
  accommodationsName?: string;
  representativeImage?: string | null;
  room?: number[];
  address?: string;
}

export default function CardAccommodations({
  id,
  lowestPrice,
  accommodationsName,
  representativeImage,
  address,
}: CardAccommodationsProp) {
  const handleErrorImage = useErrorImage();
  const navigate = useNavigate();
  return (
    <div
      className="p-4 overflow-hidden border-2 border-solid rounded-md border-gray-50 max-h-60"
      onClick={() => {
        id ? navigate(`/accommodations/${id}`) : '';
      }}
    >
      <div className="flex content-center justify-center w-full mb-4 overflow-hidden bg-gray-100 border-2 border-gray-100 border-solid rounded-md aspect-video">
        <img
          src={representativeImage || '/staynest.svg'}
          alt="logo"
          className="w-full"
          onError={handleErrorImage}
        />
      </div>
      <div>
        <h6 className="mb-1">{accommodationsName}</h6>
        <p className="text-gray-700 s2">
          {lowestPrice ? (
            <>
              {lowestPrice} <span className="text-gray-400 c2"> /박</span>
            </>
          ) : (
            address
          )}
        </p>
      </div>
    </div>
  );
}
