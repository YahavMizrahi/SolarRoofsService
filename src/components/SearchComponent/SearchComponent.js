import { SearchControl } from "react-leaflet-search";
import React from "react";
import * as data from "../BeerSheva.json";
import { connect } from "react-redux";
import { searchByAddress, changeOsmId } from "../redux/action";

const SearchComponent = ({ searchByAddress, changeOsmId }) => {
  const distance = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => {
      return (deg * Math.PI) / 180;
    };

    const x1 = deg2rad(lat1);
    const y1 = deg2rad(lon1);
    const x2 = deg2rad(lat2);
    const y2 = deg2rad(lon2);

    const R = 6373;
    const dy = y2 - y1;
    const dx = x2 - x1;
    const a =
      Math.sin(dx / 2) * Math.sin(dx / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dy / 2) * Math.sin(dy / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };

  const results = (searchInfo) => {
    const coor = searchInfo.payload.latlng;
    const info = searchInfo.payload.info;

    let nearest_point = null;
    let shortest_distance = 1000;
    let current_distance;
    data.features.forEach((feature) => {
      current_distance = distance(
        coor.lat,
        coor.lng,
        feature.geometry.coordinates[0][1],
        feature.geometry.coordinates[0][0]
      );
      if (current_distance < shortest_distance) {
        shortest_distance = current_distance;
        nearest_point = feature;
      }
    });

    return { bld: nearest_point, address: info };
  };
  React.useEffect(() => {
    return () => changeOsmId({ id: null, zoom: 13, cord: [34.7913, 31.25181] });
  }, [changeOsmId]);

  const calculateRating = (data) => {
    let { Z, area, zone, nearbyForest, nearbyWater, publicBld } = data;
    let result = 0;
    publicBld = data.public;
    area = Number(area);
    // height check
    if (Z > 0 && Z < 200) {
      result += 3;
    } else if ((Z < 0 && Z > -200) || (Z < 400 && Z > 200)) {
      result += 2;
    } else if ((Z < 1000 && Z > 400) || (Z < -200 && Z > -400)) {
      result += 1;
    }

    // area check
    if (area > 0 && area < 250) {
      result += 1;
    } else if (area > 250 && area < 1000) {
      result += 2;
    } else if (area < 5000 && area > 1000) {
      result += 3;
    } else if (area > 5000 && area < 10000) {
      result += 4;
    } else if (area > 10000 && area < 30000) {
      result += 5;
    } else if (area > 30000) {
      result += 6;
    }

    // zone check
    if (zone === "desert") {
      result += 3;
    } else if (zone === "eastern") {
      result += 2;
    } else {
      result += 1;
    }

    // near forest check
    if (nearbyForest === "1") {
      result += 1;
    } else {
      result += 2;
    }

    // near water check
    if (nearbyWater === "1") {
      result += 1;
    } else {
      result += 2;
    }

    // public building check
    if (publicBld === "public") {
      result += 2;
    } else {
      result += 1;
    }
    console.log(result);
    if (result >= 12) return "פוטנציאל גבוהה";

    if (result >= 8 && result < 12) return " פוטנציאל טוב";

    if (result < 7) return " פוטנציאל נמוך";
  };

  return (
    <SearchControl
      provider="OpenStreetMap"
      providerOptions={{ providerKey: "{BINGMAP_KEY}" }}
      inputPlaceholder="Enter address"
      showMarker={true}
      openSearchOnLoad={true}
      handler={(info) => {
        const bld = results(info);
        searchByAddress(bld);
        changeOsmId({
          id: bld.bld.properties.osm_id,
          zoom: 17,
          cord: bld.bld.geometry.coordinates[0],
          rating: calculateRating(bld.bld.properties),
        });
      }}
      closeResultsOnClick={true}
    />
  );
};

const mapStateToprops = (state) => {
  return {
    mapGeometry: state.mapGeometry,
  };
};

export default connect(mapStateToprops, { searchByAddress, changeOsmId })(
  SearchComponent
);
