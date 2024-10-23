import client from './client';

export const getBooking = async (hotel_pk: number, id: number) => {
  return await client
    .get(`/api/v1/ui/bookings/request/${hotel_pk}/${id}`) //어떤 id?
    .then(response => response.data);
};

export const getBookingStatus = async (id: number) => {
  return await client
    .get(`/api/v1/ui/bookings/status/${id}`) //어떤 id?
    .then(response => response.data);
};
