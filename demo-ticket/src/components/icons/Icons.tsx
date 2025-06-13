import React from "react";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GrAppsRounded } from "react-icons/gr";
import { GoBell } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbReport } from "react-icons/tb";
import { GrHelpBook } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosMore } from "react-icons/io";
import { RiSoundModuleLine } from "react-icons/ri";
import { BsBarChart } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";


export default function Icons({ name }: { name: string }) {
  function renderIcon() {
    switch (name) {
      case "feedback":
        return <VscFeedback />;
      case "telecom":
        return <BsBarChart />;
      case "customize":
        return <RiSoundModuleLine />;
      case "more":
        return <IoIosMore />;
      case "proposes":
        return <TiFolderOpen />;
      case "arrow-right":
        return <IoIosArrowForward />;
      case "guide":
        return <GrHelpBook />;
      case "reports":
        return <TbReport />;
      case "dashboard":
        return <MdOutlineDashboard />;
      case "home":
        return <MdHomeFilled />;
      case "overview":
        return <GoTasklist />;
      case "office":
        return <HiOutlineBuildingOffice2 />;
      case "expand":
        return <TbLayoutSidebarRightCollapse />;
      case "collapse":
        return <TbLayoutSidebarLeftCollapse />;
      case "apps":
        return <GrAppsRounded />;
      case "notifications":
        return <GoBell />;
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
