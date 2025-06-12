import React from "react";
import FilterTag from "@/components/tags/FilterTag";
import ListWithCheckBox from "@/components/list/ListWithCheckBox";
const officeImages = [
  "/assets/images/airplane.svg",
  "/assets/images/code.svg",
  "/assets/images/koala.svg",
  "/assets/images/monkey.svg",
  "/assets/images/kaban.svg",
];
const officeDatas = [
  {
    title: "Office Thanh Cong",
  },
  {
    title: "Office My Dinh",
  },
  {
    title: "Office Ho Chi Minh",
  },
];
const assigneeImages = [
  "/assets/images/airplane.svg",
  "/assets/images/code.svg",
  "/assets/images/koala.svg",
  "/assets/images/monkey.svg",
  "/assets/images/kaban.svg",
];
const assigneeDatas = [
  {
    title: "Mai Ngoc Tu",
  },
  {
    title: "Lee Min Hoo",
  },
  {
    title: "Do Dinh Hoang",
  },
  {
    title: "Huy Da",
  },
];
const statusDatas = [
  {
    title: "Completed",
  },
  {
    title: "On Hold",
  },
  {
    title: "In Progress",
  },
  {
    title: "Reopen",
  },
];
const statusImages = [
  "/assets/images/check.svg",
  "/assets/images/onhold.svg",
  "/assets/images/inprogress.svg",
  "/assets/images/reopen.svg",
  "/assets/images/kaban.svg",
];
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
        <ListWithCheckBox
          data={officeDatas}
          images={officeImages}
          rounded={false}
        />
      </div>
      <div className="search-result-title mt-4">
        <p>FILTER BY STATUS</p>
      </div>
      <div className="filter-checkbox">
        <ListWithCheckBox
          data={statusDatas}
          images={statusImages}
          rounded={false}
        />
      </div>
      <div className="search-result-title mt-4">
        <p>FILTER BY ASSIGNEE</p>
      </div>
      <div className="filter-checkbox">
        <ListWithCheckBox
          data={assigneeDatas}
          images={assigneeImages}
          rounded={true}
        />
      </div>
      <a href="#" className="action-bold-style">
        Show more
      </a>
    </>
  );
}
