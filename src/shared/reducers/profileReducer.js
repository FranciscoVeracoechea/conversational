import { actionTypes } from '../actions/profileActions';


const initialState = {
  data: null,
  loaging: false,
  errors: null,
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.saveProfile:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};
