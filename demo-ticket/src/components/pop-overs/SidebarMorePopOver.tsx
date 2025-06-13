import { Checkbox, Popover } from "antd";
import React from "react";
import Icons from "../icons/Icons";

const listNavigation = [
  {
    id: 1,
    name: "Proposes",
    icon: "proposes",
    isInSidebar: true,
  },
  {
    id: 2,
    name: "Office",
    icon: "office",
    isInSidebar: true,
  },
  {
    id: 3,
    name: "Reports",
    icon: "reports",
    isInSidebar: true,
  },
  {
    id: 4,
    name: "Guide",
    icon: "guide",
    isInSidebar: true,
  },
  {
    id: 5,
    name: "Telecom",
    icon: "telecom",
    isInSidebar: false,
  },
  {
    id: 6,
    name: "FeedBack",
    icon: "feedback",
    isInSidebar: false,
  },
];

const title = () => {
  return (
    <div className="d-flex align-items-center gap-1">
      <Icons name="customize" />
      <p className="paragraph-bold-style">Customize navigation</p>
    </div>
  );
};

const content = () => {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-center gap-2">
        <Checkbox />
        <p className="paragraph-bold-style">Add all in sidebar</p>
      </div>
        {listNavigation.map((item) => (
          <div key={item.id} className="d-flex align-items-center gap-3 margin-left-10">
            <Checkbox checked={item.isInSidebar} />
            <div className="d-flex align-items-center gap-2">
              <Icons name={item.icon} />
              <p className="paragraph-bold-style">{item.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

interface SidebarMorePopOverProps {
  children: React.ReactNode;
}

export default function SidebarMorePopOver({
  children,
}: SidebarMorePopOverProps) {
  return (
    <Popover
      placement="right"
      title={title()}
      content={content()}
      arrow={false}
      trigger="click"
      className="info_popover"
    >
      <div className="inline-block">{children}</div>
    </Popover>
  );
}
