import React from "react";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { GrAppsRounded } from "react-icons/gr";
import { GoBell } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function Icons({ name }: { name: string }) {
  function renderIcon() {
    switch (name) {
      case "expand":
        return <TbLayoutSidebarRightCollapse />;
      case "apps":
        return <GrAppsRounded />;
      case "notifications":
        return <GoBell/>;
      case "question":
        return <GoQuestion />;
      case "settings":
        return <LuSettings />;
      case "search":
        return <CiSearch />;
      case "create":
        return <FaPlus />;
    } 
  }

  return renderIcon();
}
