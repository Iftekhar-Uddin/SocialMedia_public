import {useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../../src/Context/AuthContext/AuthContext";


const useRefreshToken = () => {
  const {user, dispatch} = useContext(AuthContext);
  const api = process.env.REACT_APP_API_KEY;

  const refresh = async () => {
    try {
      const res = await axios.post(`${api}/auth/refresh`, { token: user.refreshToken, user: user });
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      dispatch({ type: "UPDATE_TOKEN", payload: {accessToken, refreshToken}});
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
};
export default useRefreshToken;

