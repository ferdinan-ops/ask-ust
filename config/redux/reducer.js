const intialState = {
  isLoading: false,
  user: {}
};

const reducer = (state = intialState, action) => {

  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  return state;
};

export default reducer;
