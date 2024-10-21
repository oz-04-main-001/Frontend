//주스탠드 사용방법

import { create } from 'zustand';
export const use이름Store = create((set, get) => {
  return {
    상태: '초깃값',
    액션: '함수',
  };
});
