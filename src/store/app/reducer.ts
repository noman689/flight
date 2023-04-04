const initialState = {
  offer: null,
  selectedDates: {},
};

const combineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_OFFER':
      return { ...state, offer: action.payload };
    case 'SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
};

export default combineReducer;
