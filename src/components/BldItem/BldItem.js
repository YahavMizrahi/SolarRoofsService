import React from "react";
import "./BldItem.css";
import { connect } from "react-redux";
import { changeOsmId } from "../redux/action";

const BldItem = ({ bldProperties, address, rating }) => {
  const checkUndefined = () => {
    if (bldProperties !== undefined) {
      return true;
    }
    return false;
  };

  if (checkUndefined()) {
    return (
      <div className="info-grid-container">
        <div className="info address">
          <h4>כתובת</h4>
          <p>{address}</p>
        </div>
        <div className="info city">
          <h4>עיר</h4>
          <p> {bldProperties.properties.name_2}</p>
        </div>

        <div className="info zone">
          <h4>איזור</h4>
          <p>
            {bldProperties.properties.zone === "desert" ? "איזור מדברי" : ""}
          </p>
        </div>
        <div className="info public">
          <h4>ציבורי/פרטי</h4>
          <p>
            {bldProperties.properties.public === null
              ? "אינו מבנה ציבורי"
              : "מבנה ציבורי"}
          </p>
        </div>
        <div className="info area">
          <h4>שטח</h4>
          <p>{bldProperties.properties.area}</p>
        </div>
        <div className="info Z">
          <h4>גובה</h4>
          <p>{bldProperties.properties.Z}</p>
        </div>

        <div className="info forrest">
          <h4>איזור מיוער</h4>
          <p>
            {" "}
            {bldProperties.properties.nearbyForest === null
              ? "אינו באיזור מיוער"
              : "איזור מיוער"}
          </p>
        </div>
        <div className="info waterway">
          <h4>איזור ואדיות</h4>
          <p>
            {" "}
            {bldProperties.properties.nearbyWater === null
              ? "אינו באיזור ואדי"
              : "קרוב לואדי"}
          </p>
        </div>
        <div className="info potential">
          <h4>פוטנציאל</h4>
          <p> {rating}</p>
        </div>
      </div>
    );
  }
  return <div></div>;
};

const mapStateToprops = (state) => {
  return {
    bldProperties: state.valueSearch.bld,
    address: state.valueSearch.address,
    rating: state.mapGeometry.rating,
  };
};

export default connect(mapStateToprops, { changeOsmId })(BldItem);
