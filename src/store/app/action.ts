export const passengersInfo = (payload: any) => (dispatch: any) => {
  dispatch({
    type: 'PASSENGERS_INFO',
    payload,
  });
};