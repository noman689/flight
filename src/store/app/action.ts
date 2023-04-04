export const selectedOffer = (payload: any) => (dispatch: any) => {
  dispatch({
    type: 'SELECTED_OFFER',
    payload,
  });
};

export const saveSelectedDate = (payload: any) => (dispatch: any) => {
  
  dispatch({
    type: 'SELECTED_DATE',
    payload,
  });
};
