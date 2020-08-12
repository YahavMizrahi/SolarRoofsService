import React from "react";
import LeafletMap from "../Map/LeafletMap";
import Menu from "../Menu/Menu";
import Table from "../Table/Table";
import SearchBar from "../SearchBar/SearchBar";

const OrganizationalService = () => {
  const renderBldList = () => {
    return <Table />;
  };
  const renderSearchBar = () => {
    return <SearchBar typeSearch="City:" />;
  };
  return (
    <div className="grid-container">
      <Menu
        service={"Organizational Service"}
        typeSearch={"City:"}
        funcRenderBld={renderBldList}
        funcRenderSearchBar={renderSearchBar}
      />
      <LeafletMap />
    </div>
  );
};

export default OrganizationalService;
