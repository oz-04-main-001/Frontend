import client from './client';

export const getUserLogin = async () => {
  return await client
    .post('/api/v1/auth/login/')
    .then(response => response.data);
};
