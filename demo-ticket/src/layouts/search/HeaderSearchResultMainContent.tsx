import React from "react";
import HeaderSearchResultLeftContent from "./HeaderSearchResultLeftContent";
import HeaderSearchResultRightContent from "./HeaderSearchResultRightContent";

export default function HeaderSearchResultMainContent() {
  return (
    <div className="container header-search-result-content">
      <div className="row">
        <div className="col-8 first-column">
          <HeaderSearchResultLeftContent />
        </div>
        <div className="col-4 second-column">
          <HeaderSearchResultRightContent />
        </div>
      </div>
    </div>
  );
}
