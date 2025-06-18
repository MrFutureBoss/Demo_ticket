"use client";
// import { takeCharaterFromFirstAndLastWord } from "@/utilities/format/takeCharaterFromFirstAndLastWord";
import { Tooltip } from "antd";
import Icons from "../icons/Icons";
import { formatTime } from "@/utilities/formatTime";

interface TextAvatarProps {
  employeeId: number | null;
  fullname: string;
  date: string;
}

export default function TextAvatarWithDate({
  employeeId,
  fullname,
  date,
}: TextAvatarProps) {
  return (
    <Tooltip title={`${employeeId} - ${fullname}`}>
      <div className="text-avatar-with-date">
        <Icons name="user" />
        &nbsp;
        <div className="text-side">
          <p>
            {employeeId ? `${employeeId} - ${fullname}` : fullname}
          </p>
          <p>
            {date ? `${formatTime(date)}` : "None"}
          </p>
        </div>
      </div>
    </Tooltip>
  );
}
