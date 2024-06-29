const AuthReducer = (state, action) => {
    switch (action.type) {

      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };

      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };

      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: action.payload,
        };

      case "UPDATE_USER":
        return {
          ...state,
          user: {
            ...state.user,
            result: action.payload,
          },
        };

      case "UPDATE_TOKEN":
        return {
          ...state,
          user: {
            ...state.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          },
        };

      case "LOGOUT":
        return {
          user: null
        };

      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            result: {...state.user.result,
              followings: [...state.user.result.followings, action.payload],
            },
          },
        };
          
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            result: {
              ...state.user.result,
              followings: state.user.result.followings.filter(
                (following) => following !== action.payload
              ),
            },
          },
        };

      default:
      return state;
    }
};
export default AuthReducer;


// case "UPDATE_USER":
//   return {
//     user: action.payload,
//     isFetching: false,
//     error: false,
//   };


// case "LOGOUT":
//   localStorage.clear();
//     return {
//       ...state,
//       user: null,
//     };

