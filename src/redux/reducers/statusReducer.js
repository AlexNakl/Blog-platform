import { TOGGLE_LOADING, ERROR_STATUS } from '../actions';

const initialState = {
  isLoading: false,
  error: {
    active: false,
    message: '',
  },
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, isLoading: action.payload };
    case ERROR_STATUS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default statusReducer;
