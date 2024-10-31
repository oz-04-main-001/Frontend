import client from './client';

export const getAccommodationsLoad = async (
  accommodationsId: string | number,
  checkIn: string,
  checkOut: string,
  guestCount: number
) => {
  return await client
    .get(`/api/v1/ui/accommodations/${accommodationsId}`, {
      params: {
        check_in_date: checkIn,
        check_out_date: checkOut,
        guests_count: guestCount,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};
export const getStateRoomLoad = async (
  accommodationsId: number,
  stateRoomId: number
) => {
  return await client
    .get(`/api/v1/ui/accommodations/${accommodationsId}/${stateRoomId}`)
    .then(response => response.data);
};
