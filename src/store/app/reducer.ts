const initialState = {
  offer: null,
};

const combineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_OFFER':
      return { ...state, offer: action.payload };
    default:
      return state;
  }
};

export default combineReducer;
