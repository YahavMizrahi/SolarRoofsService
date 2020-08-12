export const searchByCity = (cityBld, bld) => {
  console.log(cityBld);
  return {
    type: "SEARCH_BY_CITY",
    payload: { city: cityBld, bld },
  };
};
export const searchByAddress = (itemBld) => {
  return {
    type: "SEARCH_BY_ADDRESS",
    payload: itemBld,
  };
};
export const changeOsmId = (id, cord, zoom) => {
  return {
    type: "CHANGE_OSM_ID",
    payload: id,
    cord,
    zoom,
  };
};
