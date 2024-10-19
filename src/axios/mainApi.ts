import client from './client';

export const getLoad = async () => {
  return await client.get('/api/v1/ui/main').then(response => response.data);
};
