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
import { RiEqualizer2Line } from "react-icons/ri";
import { BsBarChart } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import { HiOutlineViewBoards } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { RxTextNone } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { CgColorPicker } from "react-icons/cg";
import { FaDev } from "react-icons/fa";
import { LuScale } from "react-icons/lu";
import { MdOutlineOfflinePin } from "react-icons/md";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { RiOpenaiFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function Icons({ name }: { name: string }) {
  function renderIcon() {
    switch (name) {
      case "close":
        return <IoClose/>;
      case "chat-ai":
        return <RiOpenaiFill />;
      case "tickets":
        return <IoTicketOutline />;
      case "quote-left":
        return <FaQuoteLeft />;
      case "quote-right":
        return <FaQuoteRight />;
      case "start":
        return <MdOutlineNotStarted />;
      case "field-template":
        return <MdOutlineOfflinePin />;
      case "rules-set":
        return <LuScale />;
      case "dev-mode":
        return <FaDev />;
      case "color-picker":
        return <CgColorPicker />;
      case "user":
        return <FaUserCircle />;
      case "view-text":
        return <TfiText />;
      case "none-text":
        return <RxTextNone />;
      case "form":
        return <BsReverseLayoutTextWindowReverse />;
      case "calendar":
        return <MdOutlineCalendarToday />;
      case "table":
        return <LuLayoutList />;
      case "board":
        return <HiOutlineViewBoards />;
      case "summary":
        return <RiGlobalLine />;
      case "feedback":
        return <VscFeedback />;
      case "telecom":
        return <BsBarChart />;
      case "customize":
        return <RiEqualizer2Line />;
      case "more":
        return <IoIosMore />;
      case "proposes":
        return <TiFolderOpen />;
      case "arrow-right":
        return <IoIosArrowForward />;
      case "arrow-down":
        return <IoIosArrowDown />;
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
