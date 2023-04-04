export const selectedOffer = (payload: any) => (dispatch: any) =>
  dispatch({
    type: 'SELECTED_OFFER',
    payload,
  });
