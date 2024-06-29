import { useEffect, useContext} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../src/Context/AuthContext/AuthContext";
import useRefreshToken from './refresh';

export const VarificationRequest = (varif) => {
  const refresh = useRefreshToken();
  const {user} = useContext(AuthContext);

  let currentDate = new Date();
  const decodedToken = jwt_decode(user.accessToken);
  const timeOut = decodedToken.exp * 1000 < currentDate.getTime();
  const okay = timeOut < currentDate.getTime();

  const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_KEY,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  useEffect(() => {
    axiosPrivate.interceptors.request.use(
      async (config) => {
        if (okay) {
          const data = await refresh();
          config.headers["authorization"] = "Bearer " + data.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

  },[okay, user, refresh])

  return (axiosPrivate);
};

export default VarificationRequest;



