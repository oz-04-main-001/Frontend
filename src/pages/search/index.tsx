import { useState } from 'react';
import Header from '../../assets/Header';
import CardAccommodations from '../../components/cards/CardAccommodations';
import Filter from '../../components/Filter';
import Search from '../../components/Search';
import Layout2 from '../../layouts/Layout2';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
import {
  SearchRoom,
  useSearchRoomStore,
} from '../../stores/useSearchRoomStore';

export default function Index() {
  const navigate = useNavigate();
  const [searchError, setSearchError] =
    useState<string>('검색 리스트를 불러오고 있습니다.');
  const { accommodation_data, kakao_place_data } = useSearchRoomStore();
  console.log(accommodation_data);
  return (
    <>
      <Header border={false} />
      <Search border={false} />
      <Filter />
      <Layout2>
        <div className="grid grid-cols-2 gap-6 mt-20 mb-14">
          <div className="grid grid-cols-3 gap-8">
            {accommodation_data
              ? accommodation_data.length === 0
                ? '예약가능한 숙소가 없습니다.'
                : accommodation_data.map((info: SearchRoom) => (
                    <CardAccommodations
                      key={info.id}
                      id={info.id}
                      location={info.location}
                      accommodationsName={info.name}
                      lowestPrice={info.lowest_price}
                      representativeImage={info.representative_image}
                      room={info.room}
                    />
                  ))
              : searchError}
          </div>
          <div className="sticky h-screen overflow-hidden bg-gray-200 border-2 border-solid rounded-md border-gray-50 top-14">
            <Map />
          </div>
        </div>
      </Layout2>
    </>
  );
}
