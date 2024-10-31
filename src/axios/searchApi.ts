import client from './client';

export const getSearchLoad = async (
  city: string,
  checkInDate: string,
  checkOutDate: string,
  personnel: number
) => {
  return await client
    .get(`/api/v1/accommodations/search/`, {
      params: {
        city: city,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests_count: personnel,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};
