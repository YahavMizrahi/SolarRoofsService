import React from "react";
import LeafletMap from "../Map/LeafletMap";
import Menu from "../Menu/Menu";
import BldItem from "../BldItem/BldItem";
import SearchComponent from "../SearchComponent/SearchComponent";

const PrivateService = () => {
  const renderBldInformation = () => {
    return <BldItem />;
  };

  const renderSearchBar = () => {
    return <SearchComponent />;
  };
  return (
    <div className="grid-container">
      <Menu
        service={"Private Service"}
        typeSearch={"Address:"}
        funcRenderBld={renderBldInformation}
        funcRenderSearchBar={renderSearchBar}
      />
      <LeafletMap />
    </div>
  );
};

export default PrivateService;
