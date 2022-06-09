const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: undefined
}

function blogReducer(state = initialState, action){
  switch (action.type) {
    // Fetch blogs
    case 'blogs/fetch_request':
      return {
        ...state,
        loading: true
      }

    case 'blogs/fetch_success':
      return {
        
        loading: false,
        data: [...state.data, ...action.payload.blogs],
        count: action.payload.count
      }
      
    case 'blogs/fetch_error':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      default:
        return state;  
  }  
}

export default blogReducer;