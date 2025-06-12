import React from "react";
import FilterTag from "@/components/tags/FilterTag";
import ListWithCheckBox from "@/components/list/ListWithCheckBox";

export default function HeaderSearchResultRightContent() {
  return (
    <>
      <div className="search-result-title">
        <p>LAST UPDATED</p>
      </div>
      <div className="filter-tag-container">
        <FilterTag>
          <p className="paragraph-normal-style">Any Time</p>
        </FilterTag>
        <FilterTag>
          <p className="paragraph-normal-style">Today</p>
        </FilterTag>
        <FilterTag>
          <p className="paragraph-normal-style">Yesterday</p>
        </FilterTag>
        <FilterTag>
          <p className="paragraph-normal-style">Past 7 days</p>
        </FilterTag>
        <FilterTag>
          <p className="paragraph-normal-style">Past 30 days</p>
        </FilterTag>
        <FilterTag>
          <p className="paragraph-normal-style">Past year</p>
        </FilterTag>
      </div>
      <div className="search-result-title mt-4">
        <p>FILTER BY OFFICE</p>
      </div>
      <div className="filter-checkbox">
        <ListWithCheckBox />
      </div>
    </>
  );
}
