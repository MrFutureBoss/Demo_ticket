"use client";
// import { takeCharaterFromFirstAndLastWord } from "@/utilities/format/takeCharaterFromFirstAndLastWord";
import { Tooltip } from "antd";
import Icons from "../icons/Icons";
import { countStringInArray, splitStringToArray } from "@/utilities/convert/splitStringToArray";

interface TextAvatarProps {
  employeeId: number;
  fullname: string;
  coworker: string;
}

const titleContent = (employeeId: number, fullname: string, coworker: string) => {
  const assignee = `Assignee: ${employeeId} - ${fullname}`;
  const coworkerArray = splitStringToArray(coworker);
  const coworkerCount = countStringInArray(coworkerArray);
  return `${assignee}, Coworker: ${coworkerCount} (${coworkerArray.join(", ")})`;
};

export default function CoworkerAvatar({
  employeeId,
  fullname,
  coworker,
}: TextAvatarProps) {
  return (
    <>
      <Tooltip title={titleContent(employeeId, fullname, coworker)}>
        <div className="text-avatar">
          <Icons name="user" />
          &nbsp;
          <p className="paragraph-normal-style">{fullname}</p>
        </div>
      </Tooltip>
    </>
  );
}
