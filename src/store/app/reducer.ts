const initialState = {
  info: [],
};

const combineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PASSENGERS_INFO':
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

export default combineReducer;
