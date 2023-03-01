import { REGISTRATION, PUT_REG_ERROR, LOG_OUT, PUT_IMG_USER } from '../actions';

const initialState = {
  user: null,
  regErrors: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION:
      return { ...state, user: action.payload };
    case PUT_REG_ERROR:
      return { ...state, regErrors: action.payload };
    case LOG_OUT:
      return { ...state, user: null };
    case PUT_IMG_USER:
      return { ...state, user: { ...state.user, image: action.payload } };
    default:
      return state;
  }
};

export default userDataReducer;
