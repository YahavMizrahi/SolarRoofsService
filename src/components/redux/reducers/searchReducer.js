export default (state = "", action) => {
  switch (action.type) {
    case "SEARCH_BY_CITY":
      return action.payload;
    case "SEARCH_BY_ADDRESS":
      return action.payload;

    default:
      return state;
  }
};
