import React from "react";
import { Checkbox, List } from "antd";
import Image from "next/image";

const images = [
  "/airplane.svg",
  "/code.svg",
  "/koala.svg",
  "/monkey.svg",
  "/kaban.svg",
];
const data = [
  {
    title: "Office Thanh Cong",
  },
  {
    title: "Office My Dinh",
  },
  {
    title: "Office Ho Chi Minh",
  },
];

export default function ListWithCheckBox() {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              className="align-items-center"
              title={
                <div className="d-flex gap-2 align-items-center">
                  <Checkbox></Checkbox>
                  <Image src={images[index]} width={20} height={20} alt="Office" />
                  <p className="paragraph-bold-style">{item.title}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
