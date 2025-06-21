"use client";
import React from "react";
import { Tabs, TabsProps } from "antd";
import Icons from "../icons/Icons";
import ItTableContent from "@/layouts/overview/type-display/it/ItTableContent";
import useClientSave from "@/hooks/useClientSave";

const items: TabsProps["items"] = [
  {
    key: "summary",
    label: (
      <div className="overview-tab-label">
        <Icons name="summary" /> Summary
      </div>
    ),
    children: <div>Summary</div>,
  },
  {
    key: "board",
    label: (
      <div className="overview-tab-label">
        <Icons name="board" />
        Board
      </div>
    ),
    children: <div>Board</div>,
  },
  {
    key: "calendar",
    label: (
      <div className="overview-tab-label">
        <Icons name="calendar" />
        Calendar
      </div>
    ),
    children: <div>Calendar</div>,
  },
  {
    key: "table",
    label: (
      <div className="overview-tab-label">
        <Icons name="table" />
        Table
      </div>
    ),
    children: (
      <div className="overview-tab-content">
        <ItTableContent />
      </div>
    ),
  },
  {
    key: "form",
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
  const { clientSave, patchClientSave } = useClientSave();

  const handleTabChange = (key: string) => {
    patchClientSave({ tabs: key });
  };

  return (
    <div className="overview-tabs">
      <Tabs
        activeKey={clientSave?.tabs || "table"}
        items={items}
        onChange={handleTabChange}
      />
    </div>
  );
}
