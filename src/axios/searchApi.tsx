import client from './client';

export const getSearchLoad = async (
  checkInDate: string,
  checkOutDate: string,
  personnel: number,
  city: string
) => {
  return await client
    .get(`/api/v1/accommodations/search/`, {
      params: {
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests_count: personnel,
        state: city,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
};
