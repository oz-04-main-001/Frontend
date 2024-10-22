import React, { useEffect, useState } from 'react';
import { getLoad } from '../../axios/accommodationApi';

interface CardProp {
  title: string;
  price: number;
  image: string | null;
}

const MainCard: React.FC<CardProp> = ({
  title = '숙소',
  price = 123,
  image,
}: CardProp) => {
  return (
    <div className="w-full p-4 mx-auto overflow-hidden bg-white border-2 rounded-lg border-gray-50">
      <div className="flex items-center justify-center w-full bg-gray-200 rounded-md aspect-video">
        <img src="./staynest.svg" alt="숙소 이미지" width="80" height="80" />
      </div>
      <div className="pt-4 ">
        <h2 className="mb-1 font-bold text-medium">{title}</h2>
        <p className="text-xs text-gray-700">₩{price}/박</p>
      </div>
    </div>
  );
};

export default MainCard;
