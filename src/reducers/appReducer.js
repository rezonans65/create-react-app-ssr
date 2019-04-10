const initialState = {
  message: "rendered on client"
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};
