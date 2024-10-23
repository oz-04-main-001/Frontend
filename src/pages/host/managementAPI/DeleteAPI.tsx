// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function () {
//   const [isDeleted, setIsDeleted] = useState<boolean>(false);
//   const url = `http://localhost/api/v1/accommodations/images/`;
//   const token = import.meta.env.VITE_X_CSRFTOKEN;
//   const headers = { Authorization: token };

//   useEffect(() => {
//     const deleteData = async (id: number) => {
//       try {
//         const response = await axios.delete(`${url}${id}/`, { headers });
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//   },[]);
// }
