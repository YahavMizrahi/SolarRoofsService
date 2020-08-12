import React, { useState } from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import "./LeafletMap.css";
import * as bldData from "../BeerSheva.json";
import { connect } from "react-redux";
import { changeOsmId } from "../redux/action";
import { server } from "../../api/axios";

const LeafletMap = ({ osmId, lat, lag, zoom, address, area }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [markerMessage, setMarkerMessage] = useState();
  const [imgroof, setImgroof] = useState("def");
  const roofimg = () => {
    return server.get(`/checkIMG/${osmId}`).then((res) => {
      const { repsonse } = res.data;

      if (!repsonse) {
        setImgroof("def");
      } else {
        setImgroof(osmId);
      }
    });
  };
  const renderMarkerMap = () => {
    return bldData.features
      .filter((bld) => bld.properties.osm_id === osmId)
      .map((bld) => (
        <Marker
          key={bld.properties.osm_id}
          position={[
            bld.geometry.coordinates[0][1],
            bld.geometry.coordinates[0][0],
          ]}
          onClick={() => {
            setActiveMarker(bld);
            roofimg();
          }}
        />
      ));
  };

  const clickCalcArea = () => {
    return server.get(`/getArea/${osmId}`).then((res) => {
      if (res.data.response !== false) {
        let x = area;
        console.log("123", area);
        x = (x.properties.area * res.data.response) / 100;
        setMarkerMessage("השטח הפנוי המוערך הוא:" + x);
      } else {
        setMarkerMessage("אין תמונה במאגר");
      }
    });
  };

  const renderActiveMarker = () => {
    return (
      activeMarker && (
        <Popup
          style={{ background: "black" }}
          position={[
            activeMarker.geometry.coordinates[0][1],
            activeMarker.geometry.coordinates[0][0],
          ]}
          onClose={() => {
            setActiveMarker(null);
            setMarkerMessage(null);
          }}
        >
          <div className="popup">
            <h2>{" עיר: " + activeMarker.properties.name_2}</h2>
            <h2>
              {address !== undefined
                ? " כתובת: " + address
                : "אין כתובת מדוייקת"}
            </h2>
            <h2>
              {activeMarker.properties.name !== null
                ? " שם: " + activeMarker.properties.name
                : null}
            </h2>
            <h2>{"שטח הגג: " + activeMarker.properties.area}</h2>
            <h2>{" גובה: " + activeMarker.properties.Z}</h2>
            <h2>
              " איזור: "{}
              {activeMarker.properties.zone !== null ? "מדברי" : "לא ידוע"}
            </h2>
            <h2>
              " אזור מיוער: "{}
              {activeMarker.properties.nearbyForest === null ? "לא" : "כן"}
            </h2>
            <h2>
              " קרוב לואדי: "{" "}
              {activeMarker.properties.nearbyWater === null ? "לא" : "כן"}
            </h2>
            <h2>
              " מבנה ציבורי: "{" "}
              {activeMarker.properties.public === null ? "לא" : "כן"}
            </h2>

            <img className="img-bld" src={require(`./${imgroof}.png`)} />
            <button onClick={clickCalcArea}>חישוב שטח פנוי</button>
          </div>
          <div className="resArea">{markerMessage}</div>
        </Popup>
      )
    );
  };
  return (
    <div>
      <Map center={[lag, lat]} zoom={zoom}>
        <TileLayer
          url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy;  <a href="http://www.esri.com/">Esri</a> '
          maxZoom={18}
        />
        {renderMarkerMap()}
        {renderActiveMarker()}
      </Map>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    osmId: state.mapGeometry.id,
    lat: state.mapGeometry.cord[0],
    lag: state.mapGeometry.cord[1],
    zoom: state.mapGeometry.zoom,
    address: state.valueSearch.address,
    area: state.valueSearch.bld,
  };
};
export default connect(mapStateToProps, { changeOsmId })(LeafletMap);
