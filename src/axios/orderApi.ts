import client from './client';

export const postBooking = async (
  accommodationId: string | number,
  stateRoomId: string,
  checkInDate: string,
  checkOutDate: string,
  guestsCount: number
) => {
  return await client
    .post(`/api/v1/bookings/request/${accommodationId}/${stateRoomId}/`, {
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guests_count: guestsCount,
    })
    .then(response => response.data);
};

export const getBookingStatus = async (id: string) => {
  return await client
    .get(`/api/v1/ui/bookings/status/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

export const putBookingCancel = async (bookingId: string) => {
  return await client
    .patch(`/api/v1/bookings/cancel/${bookingId}/`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

export const getUserOrderList = async () => {
  return await client.get('api/v1/ui/mypage/').then(response => response.data);
};
