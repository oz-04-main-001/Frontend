import Badges, { BadgeStatus } from '../../assets/Badges';
import useErrorImage from '../../customHooks/useErrorImage';

interface CardProps {
  imageUrl?: string | null;
  badgeStatus: BadgeStatus;
  accommodationName: string;
  roomName: string;
}

export function CardMypage({
  imageUrl,
  badgeStatus,
  accommodationName,
  roomName,
}: CardProps) {
  const handleErrorImage = useErrorImage();

  return (
    <div className="flex w-full mb-6 border-2 border-gray-100 rounded-lg bg-gray-50">
      <div className="w-1/6 m-5 overflow-hidden bg-gray-100 border-2 border-gray-200 rounded-md aspect-square">
        <img
          src={imageUrl || '/staynest.svg'}
          alt={accommodationName}
          className="w-full"
          onError={handleErrorImage}
        />
      </div>
      <div className="flex flex-col justify-center p-4 space-y-2">
        <div>
          <Badges status={badgeStatus} />
        </div>
        <h2 className="text-lg font-medium text-black">{accommodationName}</h2>
        <p className="text-sm text-gray-500">{roomName}</p>
      </div>
    </div>
  );
}

export default CardMypage;
