import axios from 'axios';
import { SERVER_URL } from '@client/config';

export const LoginAPI = async (userInfo) => {
  const body = {
    password: userInfo.password,
    email: userInfo.email,
  };
  return await axios.post(`${SERVER_URL}/login`, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};

export const VerifyUserAPI = async () => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/user/${localStorage.getItem('duffel-id')}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('duffel-token')}`,
      _id: localStorage.getItem('duffel-id'),
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};
