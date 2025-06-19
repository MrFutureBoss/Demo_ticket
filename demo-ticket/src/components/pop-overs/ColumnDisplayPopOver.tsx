import React from "react";
import { Popover, Checkbox, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useClientSave from "@/hooks/useClientSave";

const columnOptions = [
  // { label: "📊 Status", value: "status" },
  // { label: '💼 Type', value: 'type' },
  // { label: '📝 Content', value: 'content' },
  // { label: '💻 PC ID', value: 'pc_id' },
  { label: "📍 Location", value: "location" },
  // { label: '👤 Assignee', value: 'handle' },
  // { label: '👥 Reporter', value: 'user_id' },
  // { label: '📅 Receive Date', value: 'receive_date' },
  // { label: '⭐ Rating', value: 'rating' },
  // { label: '🎯 Difficulty', value: 'difficulty' },
  { label: "💬 Feedback", value: "feedback" },
  // { label: '👥 Team', value: 'team' },
  { label: "📧 Email", value: "email" },
  { label: "📨 Gmail", value: "gmail" },
];

interface ColumnDisplayPopOverProps {
  // checkedList: string[];
  onCheckedListChange: (value: string[]) => void;
}

const ColumnDisplayPopOver: React.FC<ColumnDisplayPopOverProps> = ({
  // checkedList,
  onCheckedListChange,
}) => {
  const { clientSave, patchClientSave } = useClientSave();

  // Chỉ lấy các key cho phép ẩn/hiện
  const allowedKeys = columnOptions.map(opt => opt.value);
  const columnsDisplay = clientSave?.table?.columnsDisplay || {};
  const checkedList = allowedKeys.filter(key => columnsDisplay[key]);

  const handleColumnDisplay = (columnsDisplay: { [key: string]: boolean }) => {
    patchClientSave({ table: { columnsDisplay } });
  };

  return (
    <Popover
      placement="bottomLeft"
      content={
        <div>
          <Divider style={{ margin: "8px 0" }}>Fields displayed</Divider>
          <Checkbox.Group
            value={checkedList}
            options={columnOptions}
            onChange={(value) => {
              const allKeys = columnOptions.map(opt => opt.value);
              const columnsDisplay = Object.fromEntries(
                allKeys.map(key => [key, value.includes(key)])
              );
              handleColumnDisplay(columnsDisplay);
              onCheckedListChange(value as string[]);
            }}
            className="column-display-popover"
          />
        </div>
      }
      trigger="click"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <PlusOutlined />
      </div>
    </Popover>
  );
};

export default ColumnDisplayPopOver;
