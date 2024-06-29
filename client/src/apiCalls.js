import axios from "axios";
const api = process.env.REACT_APP_API_KEY;


export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START", payload: true });
  try {
    const res = await axios.post(`${api}/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res)

  } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    if (!err?.response) {
      dispatch({ type: "LOGIN_FAILURE", payload: 'No Server Response' });
    } else if (err.response?.status === 400) {
      dispatch({ type: "LOGIN_FAILURE", payload: 'Wrong Password' });
    } else if (err.response?.status === 401) {
      dispatch({ type: "LOGIN_FAILURE", payload: 'Unauthorized' });
    } else if (err.response?.status === 404){
      dispatch({ type: "LOGIN_FAILURE", payload: 'User Not Found' });
    }else if (err.response?.status === 403){
      dispatch({ type: "LOGIN_FAILURE", payload: 'Access Denied' });
    }else{
      dispatch({ type: "LOGIN_FAILURE", payload: 'No Internet Connection' });
    }
  }
};



