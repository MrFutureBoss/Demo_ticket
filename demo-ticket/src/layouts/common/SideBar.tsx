"use client";

import Icons from "@/components/icons/Icons";
import SidebarMorePopOver from "@/components/pop-overs/SidebarMorePopOver";
import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import TicketListPopOver from "@/components/pop-overs/TicketListPopOver";
import Status from "@/components/icons/Status";

const listNavigation = [
  {
    id: 1,
    name: "Overview",
    path: "/",
    icon: "overview",
    isInSidebar: true,
    isDropdown: false,
  },
  {
    id: 2,
    name: "Tickets",
    path: "/tickets",
    icon: "tickets",
    isDropdown: true,
    isInSidebar: true,
    children: [
      {
        id: 1,
        icon: <Status status={1} showTitle={false} />,
        name: "Open",
        path: "",
      },
      {
        id: 2,
        icon: <Status status={6} showTitle={false} />,
        name: "On Hold",
        path: "",
      },
    ],
  },
  {
    id: 3,
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    isInSidebar: true,
  },
  {
    id: 4,
    name: "Office",
    path: "/office",
    icon: "office",
    isInSidebar: true,
  },
  {
    id: 5,
    name: "Reports",
    path: "/reports",
    icon: "reports",
    isInSidebar: true,
  },
  {
    id: 6,
    name: "Guide",
    path: "/guide",
    icon: "guide",
    isInSidebar: true,
  },
  {
    id: 7,
    name: "Telecom",
    path: "/telecom",
    icon: "telecom",
    isInSidebar: false,
  },
  {
    id: 8,
    name: "FeedBack",
    path: "/feedback",
    icon: "feedback",
    isInSidebar: false,
  },
];

const SideBar = memo(function SideBar() {
  const pathname = usePathname();

  const isActive = useMemo(
    () => (path: string) => {
      if (path === "/") {
        return pathname === "/" || pathname === "";
      }
      return pathname === path;
    },
    [pathname]
  );

  const renderNavigation = useMemo(() => {
    return listNavigation.map((item) => (
      <div key={item.id}>
        <a
          className={`sidebar-item ${
            isActive(item.path || "") ? "sidebar-item-active" : ""
          } ${item.isInSidebar ? "" : "d-none"}`}
          href={`${item.path}`}
        >
          <div className="sidebar-item-icon">
            <Icons name={item.icon} />
          </div>
          <div className="sidebar-item-text">
            <p className="paragraph-bold-style">{item.name}</p>
          </div>
          {item.isDropdown && (
            <div className="sidebar-dropdown">
              <Icons
                name={isActive(item.path) ? "arrow-down" : "arrow-right"}
              />
            </div>
          )}
        </a>
        {item.isDropdown && isActive(item.path) && (
          <p className="sidebar-sub-text">List {item.children?.length}</p>
        )}

        {item.isDropdown && isActive(item.path) && (
          <div className="sidebar-dropdown-content">
            {item.children?.map((child) => (
              <TicketListPopOver key={child.id}>
                <div className="sidebar-dropdown-item">
                  <div className="sidebar-item-icon">
                    {child.icon && child.icon}
                  </div>
                  <div className="sidebar-item-text">
                    <p className="paragraph-bold-style">{child.name}</p>
                  </div>
                </div>
              </TicketListPopOver>
            ))}
          </div>
        )}
      </div>
    ));
  }, [isActive]);

  return (
    <div className="d-flex flex-column mt-2">
      {renderNavigation}
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
});

export default SideBar;
