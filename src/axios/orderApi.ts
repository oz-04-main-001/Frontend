import client from './client';

export const postBooking = async (
  accommodationId: number,
  stateRoomId: number,
  bookerPhoneNumber: string | null,
  bookerName: string | null,
  checkInDate: string | null,
  checkOutDate: string | null,
  guestsCount: number | null
) => {
  return await client
    .post(`/api/v1/ui/bookings/request/${accommodationId}/${stateRoomId}`, {
      accommodation_id: accommodationId,
      room_id: stateRoomId,
      booker_phone_number: bookerPhoneNumber,
      booker_name: bookerName,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guests_count: guestsCount,
    })
    .then(response => response.data);

export const getBooking = async (hotel_pk: number, id: number) => {
  return await client
    .post(`/api/v1/ui/bookings/request/${hotel_pk}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

export const getBooking = async (hotel_pk: number, id: number) => {
  return await client
    .post(`/api/v1/ui/bookings/request/${hotel_pk}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

export const getBookingStatus = async (id: number) => {
  return await client
    .get(`/api/v1/ui/bookings/status/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};

export const putBookingCancel = async (bookingId: number) => {
  return await client
    .put(`/api/v1/bookings/cancel/${bookingId}/`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};
