import actionType from '../actionType';

let initialState = {
  data: {
    id: 0,
    username: '',
    date: 0,
  },
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (actionType.type) {
    case actionType.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case actionType.FETCH_DATA_FAILED:
      return {
        ...state,
        error: action.message,
      };
    default:
      return state;
  }
};
export default rootReducer;
