import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

export const postHostCreate = async (formData: FormData): Promise<any> => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    try {
      const response = await axios.post(
        `${serverURL}/api/v1/auth/host/register/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
