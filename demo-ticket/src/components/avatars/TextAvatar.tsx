"use client";
// import { takeCharaterFromFirstAndLastWord } from "@/utilities/format/takeCharaterFromFirstAndLastWord";
import { Tooltip } from "antd";
import Icons from "../icons/Icons";

interface TextAvatarProps {
  employeeId: number | null;
  fullname: string;
  small?: boolean;
}

export default function TextAvatar({ employeeId, fullname, small = false }: TextAvatarProps) {
  return (
    <Tooltip title={`${employeeId} - ${fullname}`}>
      <div className={`text-avatar ${small ? "small" : "normal"}`}>
        <Icons name="user" />&nbsp;
        <p className="paragraph-normal-style">
          {employeeId ? `${employeeId} - ${fullname}` : fullname}
        </p>
      </div>
    </Tooltip>
  );
}
