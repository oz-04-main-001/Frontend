import client from './client';

export const getAccommodationsLoad = async (accommodationsId: number) => {
  return await client
    .get(`/api/v1/ui/accommodations/${accommodationsId}`)
    .then(response => response.data);
};
export const getStateRoomLoad = async (
  accommodationsId: number,
  stateRoomId: number
) => {
  return await client
    .get(`/api/v1/ui/accommodations/${accommodationsId}/${stateRoomId}`)
    .then(response => response.data);
};
