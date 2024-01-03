const GET_USER_STATS = "stats/getStats";

const getStats = (data) => ({
  type: GET_USER_STATS,
  payload: data,
});

export const fetchUserStats = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/stats/${userId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getStats(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

const initialState = {};

export default function statsReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case GET_USER_STATS:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
