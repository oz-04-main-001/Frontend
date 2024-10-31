import { SyntheticEvent } from 'react';

export default function useErrorImage() {
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/staynest.svg';
  };

  return addDefaultImg;
}
