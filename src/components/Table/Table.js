import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as bld from "../BeerSheva.json";
import "./Table.css";
import { changeOsmId, searchByCity } from "../redux//action";

const Table = ({ searchValue, changeOsmId, zoom, searchByCity }) => {
  const onClickOnBld = (id, cord, zoom, bldp) => {
    changeOsmId({ id, cord, zoom });
  };

  const calculateRating = (data) => {
    const { height, area, zone, nearForest, nearWater, publicBld } = data;
    let result = 0;

    if (height > 0 && height < 200) {
      result += 3;
    } else if (
      (height < 0 && height > -200) ||
      (height < 400 && height > 200)
    ) {
      result += 2;
    } else if (
      (height < 1000 && height > 400) ||
      (height < -200 && height > -400)
    ) {
      result += 1;
    }

    // area check
    if (area > 0 && area < 250) {
      result += 1;
    } else if (area > 250 && area < 1000) {
      result += 2;
    } else if (area > 5000 && area < 1000) {
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
    if (nearForest === "1") {
      result += 1;
    } else {
      result += 2;
    }

    // near water check
    if (nearWater === "1") {
      result += 1;
    } else {
      result += 2;
    }

    // public building check
    if (publicBld === true) {
      result += 2;
    } else {
      result += 1;
    }

    if (result >= 12) return "פוטנציאל גבוהה";

    if (result >= 8 && result < 12) return " פוטנציאל טוב";

    if (result < 7) return " פוטנציאל נמוך";
  };

  const rating = (bldProp) => {
    const data = {
      height: bldProp.Z,
      area: Number(bldProp.area),
      zone: bldProp.zone,
      nearForest: bldProp.nearbyForest,
      nearWater: bldProp.nearbyWater,
      publicBld: bldProp.public,
    };

    let rate = calculateRating(data);

    return rate;
  };

  const renderTableData = () => {
    const bldData = bld.features;
    return bldData
      .filter((bld) => bld.properties.name_2 === searchValue.city)
      .map((bld) => (
        <tr
          key={bld.properties.osm_id}
          onClick={() => {
            searchByCity(searchValue.city, bld);
            onClickOnBld(
              bld.properties.osm_id,
              bld.geometry.coordinates[0],
              (zoom = 17)
            );
          }}
        >
          <td>{bld.properties.name}</td>
          <td>{bld.properties.public}</td>
          <td>{bld.properties.area}</td>
          <td>{rating(bld.properties)}</td>
        </tr>
      ));
  };
  const renderTableHeader = () => {
    return (
      <tr>
        <th>Address</th>
        <th>Public</th>
        <th>Area</th>
        <th>Potential</th>
      </tr>
    );
  };

  useEffect(() => {
    return () => changeOsmId({ id: null, zoom: 13, cord: [34.7913, 31.25181] });
  }, [changeOsmId]);

  return (
    <div>
      <table className="bld-list">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    searchValue: state.valueSearch,
    zoom: state.mapGeometry.zoom,
  };
};
export default connect(mapStateToProps, { changeOsmId, searchByCity })(Table);
