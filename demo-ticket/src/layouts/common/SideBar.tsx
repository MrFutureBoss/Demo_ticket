import Icons from "@/components/icons/Icons";
import SidebarMorePopOver from "@/components/pop-overs/SidebarMorePopOver";
import React from "react";

const listNavigation = [
  {
    id: 1,
    name: "Dashboard",
    icon: "dashboard",
    isInSidebar: true,
  },
  {
    id: 2,
    name: "Overview",
    icon: "overview",
    isInSidebar: true,
    isDropdown: true,
  },
  {
    id: 3,
    name: "Proposes",
    icon: "proposes",
    isInSidebar: true,
  },
  {
    id: 4,
    name: "Office",
    icon: "office",
    isInSidebar: true,
    isDropdown: true,
  },
  {
    id: 5,
    name: "Reports",
    icon: "reports",
    isInSidebar: true,
  },
  {
    id: 6,
    name: "Guide",
    icon: "guide",
    isInSidebar: true,
  },
  {
    id: 7,
    name: "Telecom",
    icon: "telecom",
    isInSidebar: false,
  },
  {
    id: 8,
    name: "FeedBack",
    icon: "feedback",
    isInSidebar: false,
  },
];

export default function SideBar() {
  return (
    <div className="d-flex flex-column mt-2">
      {listNavigation.map((item) => (
        <a
          key={item.id}
          className={`sidebar-item active ${item.isInSidebar ? "" : "d-none"}`}
          href={`${item.name}`}
        >
          <div className="sidebar-item-icon">
            <Icons name={item.icon} />
          </div>
          <div className="sidebar-item-text">
            <p className="paragraph-bold-style">{item.name}</p>
          </div>
          {item.isDropdown && (
            <div className="sidebar-dropdown">
              <Icons name="arrow-right" />
            </div>
          )}
        </a>
      ))}
      <SidebarMorePopOver>
        <div className="sidebar-item">
          <div className="sidebar-item-icon">
            <Icons name="more" />
          </div>
          <div className="sidebar-item-text">
            <p className="paragraph-bold-style">More</p>
          </div>
        </div>
      </SidebarMorePopOver>
    </div>
  );
}
