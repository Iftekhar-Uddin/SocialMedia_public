export const Initial_Value = {
  posts: [],
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...state, posts: action.payload
      };
      
    case "RE_FETCH_ALL":
      return {
        ...state,
        posts: action.payload
      };

    case "CREATE":
      return {
        ...state, posts: [...state.posts, action.payload] 
      };

    case "UPDATE":
      return { 
        ...state, posts: state.posts.map((post) => (post._id === action.payload.id ? action.payload.result : post)) 
      };

    case 'LIKE':
      return { 
        ...state, posts: state.posts.map((post) => (post._id === action.payload.id ? action.payload.data : post)) 
      };

    case "DELETE":
      return {
        ...state, posts: state.posts.filter((post) => post._id !== action.payload)
      }

    case "COMMENT":
      return { ...state, posts: state.posts.map((post) => {
        if(post._id === action.payload._id) return action.payload;
          return post;
        }) 
      };

    default:
    return state;
  }
};