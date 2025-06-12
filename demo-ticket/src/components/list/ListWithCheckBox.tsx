import React from "react";
import { Checkbox, List } from "antd";
import Image from "next/image";

interface ListWithCheckBoxProps {
  data: { title: string }[];
  images: string[];
  rounded: boolean;
}

export default function ListWithCheckBox({
  data,
  images,
  rounded,
}: ListWithCheckBoxProps) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="border-none">
            <List.Item.Meta
              className="align-items-center"
              title={
                <div className="d-flex gap-2 align-items-center">
                  <Checkbox></Checkbox>
                  <Image
                    src={images[index]}
                    width={20}
                    height={20}
                    alt="Office"
                    className={rounded ? "image-rounded" : ""}
                  />
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
