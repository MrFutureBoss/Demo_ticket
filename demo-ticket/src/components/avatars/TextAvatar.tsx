"use client";
// import { takeCharaterFromFirstAndLastWord } from "@/utilities/format/takeCharaterFromFirstAndLastWord";
import { Tooltip } from "antd";
import Icons from "../icons/Icons";

interface TextAvatarProps {
  employeeId: number;
  fullname: string;
}

export default function TextAvatar({ employeeId, fullname }: TextAvatarProps) {
  return (
    <Tooltip title={`${employeeId} - ${fullname}`}>
      <div className="text-avatar">
        <Icons name="user" />&nbsp;
        <p className="paragraph-normal-style">
          {fullname}
        </p>
      </div>
    </Tooltip>
  );
}
