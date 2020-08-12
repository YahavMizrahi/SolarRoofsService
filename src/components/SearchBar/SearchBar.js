import React, { useState } from "react";
import { searchByCity } from "../redux/action";
import { connect } from "react-redux";

const SearchBar = ({ searchByCity }) => {
  const [location, setLocation] = useState("");

  const onClickSearch = () => {
    if (location.length > 0) searchByCity(location, null);
  };

  return (
    <div>
      <label
        style={{
          fontWeight: "600",
          marginRight: "10px",
          color: "white",
          background: "rgba(68, 68, 68, 0.288)",
          fontSize: "20px",
        }}
      >
        City:
      </label>
      <input
        type="text"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <button onClick={onClickSearch}>Search</button>
    </div>
  );
};

export default connect(null, { searchByCity })(SearchBar);
