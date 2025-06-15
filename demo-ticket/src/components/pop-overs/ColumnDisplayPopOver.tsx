import React from 'react';
import { Popover, Checkbox, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columnOptions } from '../table/dumpApi';

interface ColumnDisplayPopOverProps {
  checkedList: string[];
  onCheckedListChange: (value: string[]) => void;
}

const ColumnDisplayPopOver: React.FC<ColumnDisplayPopOverProps> = ({
  checkedList,
  onCheckedListChange,
}) => {
  return (
    <Popover
      placement="bottomLeft"
      content={
        <div style={{ padding: '8px', minWidth: '200px' }}>
          <Divider style={{ margin: '8px 0' }}>Columns displayed</Divider>
          <Checkbox.Group
            value={checkedList}
            options={columnOptions}
            onChange={(value) => {
              onCheckedListChange(value as string[]);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          />
        </div>
      }
      trigger="click"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          cursor: 'pointer'
        }}
      >
        <PlusOutlined />
      </div>
    </Popover>
  );
};

export default ColumnDisplayPopOver;
