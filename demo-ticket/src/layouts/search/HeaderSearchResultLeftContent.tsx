import ResultLists from "@/components/list/ResultLists";
import React from "react";

const data = [
  {
    title: "Screen is not working",
    pcId: "PC-515",
    office: "Office Thanh Cong",
    officeImage: "/assets/images/airplane.svg",
    updatedAt: 1,
    assignee: "Mai Ngoc Tu",
    assigneeImage: "/assets/images/airplane.svg",
    reporter: "Do Thu Ha",
    reporterImage: "/assets/images/user.svg",
    status: "In Progress",
    statusImage: "/assets/images/inprogress.svg",
  },
  {
    title: "Mickey Mouse bited headset wire",
    pcId: "PC-516",
    office: "Office My Dinh",
    officeImage: "/assets/images/code.svg",
    updatedAt: 7,
    assignee: "Do Dinh Hoang",
    assigneeImage: "/assets/images/koala.svg",
    reporter: "Do Thu Ha",
    reporterImage: "/assets/images/user.svg",
    status: "Completed",
    statusImage: "/assets/images/check.svg",
  },
  {
    title: "Wifi is down",
    pcId: "PC-517",
    office: "Office Thanh Cong",
    officeImage: "/assets/images/airplane.svg",
    updatedAt: 30,  
    assignee: "Huy Da",
    assigneeImage: "/assets/images/monkey.svg",
    reporter: "Do Thu Ha",
    reporterImage: "/assets/images/user.svg",
    status: "On Hold",
    statusImage: "/assets/images/onhold.svg",
  },
];
const images = [
  "/assets/images/screen.svg",
  "/assets/images/headset.svg",
  "/assets/images/wifi.svg",
];

export default function HeaderSearchResultLeftContent() {
  return (
    <>
      <div className="search-result-title">
        <p>RECENTLY VIEWS</p>
      </div>
      <ResultLists data={data} images={images} rounded={false} />
    </>
  );
}
