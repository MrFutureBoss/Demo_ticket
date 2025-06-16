import { Tag } from "antd";
import React from "react";
import Icons from "../icons/Icons";
import { formatTime } from "@/utilities/formatTime";
interface DateTagProps {
  date: string;
}

export default function DateTag({ date }: DateTagProps) {
  return (
    <Tag color="white" className="date-tag">
      <p className="paragraph-bold-style">
        <Icons name="calendar" />
        &nbsp;{formatTime(date)}
      </p>
    </Tag>
  );
}
