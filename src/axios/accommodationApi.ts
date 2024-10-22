import client from './client';

export const getLoad = async (accommodationsId: number) => {
  return await client
    .get(`/api/v1/ui/accommodations/${accommodationsId}`)
    .then(response => response.data);
};
