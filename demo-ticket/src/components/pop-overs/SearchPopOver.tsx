"use client";
import { Popover, Tabs } from "antd";
import React from "react";
import { TabsProps } from "antd";
import HeaderSearchResult from "../list/HeaderSearchResult";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Jira",
    children: <HeaderSearchResult />,
  },
  {
    key: "2",
    label: "Compass",
    children: <p>Content of Tab Pane 2</p>,
  },
];

const title = <div className="search_result_popover_title"></div>;

const content = (
  <div className="search_result_popover_content">
    <Tabs defaultActiveKey="1" items={items}></Tabs>
  </div>
);

export default function SearchPopOver() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      placement="bottom"
      title={title}
      content={content}
      arrow={false}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      className="search_result_popover"
    >
      <div onClick={() => setOpen(true)} className="inline-block">
        <input
          className="header-input-search"
          placeholder="Search"
          maxLength={500}
          type="text"
        />
      </div>
    </Popover>
  );
}
