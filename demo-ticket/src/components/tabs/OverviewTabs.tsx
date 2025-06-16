import React from "react";
import { Tabs, TabsProps } from "antd";
import Icons from "../icons/Icons";
import TicketTable from "../table/TicketTable";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <div className="overview-tab-label">
        <Icons name="summary" /> Summary
      </div>
    ),
    children: <div>Summary</div>,
  },
  {
    key: "2",
    label: (
      <div className="overview-tab-label">
        <Icons name="board" />
        Board
      </div>
    ),
    children: <div>Board</div>,
  },
  {
    key: "3",
    label: (
      <div className="overview-tab-label">
        <Icons name="calendar" />
        Calendar
      </div>
    ),
    children: <div>Calendar</div>,
  },
  {
    key: "4",
    label: (
      <div className="overview-tab-label">
        <Icons name="table" />
        Table
      </div>
    ),
    children: <div className="overview-tab-content"> <TicketTable /></div>,
  },
  {
    key: "5",
    label: (
      <div className="overview-tab-label">
        <Icons name="form" />
        Form
      </div>
    ),
    children: <div>Form</div>,
  },
];

export default function OverviewTabs() {
  return (
    <div className="overview-tabs">
      <Tabs defaultActiveKey="4" items={items}></Tabs>
    </div>
  );
}
