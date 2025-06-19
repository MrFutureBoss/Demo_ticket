"use client";

import Icons from "@/components/icons/Icons";
import SidebarMorePopOver from "@/components/pop-overs/SidebarMorePopOver";
import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    isInSidebar: true,
  },
  {
    id: 3,
    name: "Tickets",
    path: "/dashboard",
    icon: "dashboard",
    isInSidebar: true,
  },
  {
    id: 4,
    name: "Proposes",
    path: "/proposes",
    icon: "proposes",
    isInSidebar: true,
  },
  {
    id: 5,
    name: "Office",
    path: "/office",
    icon: "office",
    isInSidebar: true,
    isDropdown: true,
    children: [
      {
        id: 1,
        icon: "",
        imageUrl: "/assets/images/airplane.svg",
        name: "Office Thanh Cong",
        path: "",
      },
      {
        id: 2,
        icon: "",
        imageUrl: "/assets/images/code.svg",
        name: "Office My Dinh",
        path: "",
      },
      {
        id: 3,
        icon: "",
        imageUrl: "/assets/images/koala.svg",
        name: "Office Ho Chi Minh",
        path: "",
      },
    ],
  },
  {
    id: 6,
    name: "Reports",
    path: "/reports",
    icon: "reports",
    isInSidebar: true,
  },
  {
    id: 7,
    name: "Guide",
    path: "/guide",
    icon: "guide",
    isInSidebar: true,
  },
  {
    id: 8,
    name: "Telecom",
    path: "/telecom",
    icon: "telecom",
    isInSidebar: false,
  },
  {
    id: 9,
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
            isActive(item.path) ? "sidebar-item-active" : ""
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
              <a
                key={child.id}
                href={`${child.path}`}
                className="sidebar-dropdown-item"
              >
                <div className="sidebar-item-icon">
                  {child.imageUrl && (
                    <Image
                      src={child.imageUrl}
                      alt={child.name}
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <div className="sidebar-item-text">
                  <p className="paragraph-bold-style">{child.name}</p>
                </div>
              </a>
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
