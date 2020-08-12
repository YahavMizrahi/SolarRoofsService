export default (
  state = { id: "", cord: [34.7913, 31.25181], zoom: 13 },
  action
) => {
  switch (action.type) {
    case "CHANGE_OSM_ID":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
