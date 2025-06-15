"use client";
import React, { useContext, useMemo, useState } from "react";
import { Table, Button, Space, Tooltip, Checkbox } from "antd";
import type { TableProps } from "antd/es/table";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./TicketTable.css";
import Status from "../icons/Status";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import { DataType, generateData, defaultCheckedList } from "./dumpApi";
import ColumnDisplayPopOver from "../pop-overs/ColumnDisplayPopOver";

interface ResizableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'width'> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface ResizableColumnGroupType<RecordType>
  extends Omit<ColumnGroupType<RecordType>, 'width'> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

type ResizableColumn<RecordType> =
  | ResizableColumnType<RecordType>
  | ResizableColumnGroupType<RecordType>;

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResizableTitle = (props: any) => {
  const { onResize, width, minWidth, maxWidth, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      minConstraints={[minWidth, 0]}
      maxConstraints={[maxWidth, 0]}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const TicketTable: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(generateData());
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});

  const getBaseColumns = (): ResizableColumn<DataType>[] => [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      key: "ticketId",
      width: columnWidths["ticketId"] || 70,
      minWidth: 70,
      maxWidth: 70,
      fixed: "left",
      sorter: (a, b) => a.ticketId.localeCompare(b.ticketId),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: columnWidths["status"] || 90,
      minWidth: 80,
      maxWidth: 120,
      filters: [
        { text: "Completed", value: 1 },
        { text: "On Hold", value: 2 },
        { text: "In Progress", value: 3 },
        { text: "Reopen", value: 4 },
        { text: "Open", value: 5 },
        { text: "Unassigned", value: 6 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => <Status status={status} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: columnWidths["title"] || 200,
      minWidth: 150,
      maxWidth: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: columnWidths["assignee"] || 150,
      minWidth: 120,
      maxWidth: 250,
      filters: [
        { text: "John Doe", value: "John Doe" },
        { text: "Jane Smith", value: "Jane Smith" },
        { text: "Mike Johnson", value: "Mike Johnson" },
        { text: "Sarah Wilson", value: "Sarah Wilson" },
      ],
      onFilter: (value, record) => record.assignee === value,
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      width: columnWidths["reporter"] || 150,
      minWidth: 120,
      maxWidth: 250,
      filters: [
        { text: "Alice Brown", value: "Alice Brown" },
        { text: "Bob Davis", value: "Bob Davis" },
        { text: "Carol Evans", value: "Carol Evans" },
        { text: "David Miller", value: "David Miller" },
      ],
      onFilter: (value, record) => record.reporter === value,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: columnWidths["description"] || 300,
      minWidth: 250,
      maxWidth: 600,
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: (
        <ColumnDisplayPopOver
          checkedList={checkedList}
          onCheckedListChange={setCheckedList}
        />
      ),
      key: "action",
      width: 24,
      minWidth: 24,
      maxWidth: 24,
      fixed: "right",
      align: 'center'
    },
  ];

  const columns = getBaseColumns().map(col => ({
    ...col,
    hidden: col.key === 'ticketId' || col.key === 'action' ? false : !checkedList.includes(col.key as string),
  }));

  const handleResize =
    (index: number) =>
    (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
      const column = getBaseColumns()[index] as ResizableColumnType<DataType>;
      const newWidth = Math.min(
        Math.max(size.width, column.minWidth || 50),
        column.maxWidth || 500
      );

      setColumnWidths(prev => ({
        ...prev,
        [column.key as string]: newWidth
      }));
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      row: Row,
    },
  };

  const tableColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ResizableColumn<DataType>) => ({
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      onResize: handleResize(index),
    }),
  })) as ColumnType<DataType>[];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 50,
    fixed: "left",
    columnTitle: () => (
      <Checkbox
        checked={selectedRowKeys.length === dataSource.length}
        indeterminate={
          selectedRowKeys.length > 0 &&
          selectedRowKeys.length < dataSource.length
        }
        onChange={(e) => {
          const newSelectedRowKeys = e.target.checked
            ? dataSource.map((item) => item.key)
            : [];
          onSelectChange(newSelectedRowKeys);
        }}
      />
    ),
    renderCell: (checked, record) => (
      <Space>
        <DragHandle />
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => {
            const newSelectedRowKeys = e.target.checked
              ? [...selectedRowKeys, record.key]
              : selectedRowKeys.filter((key) => key !== record.key);
            onSelectChange(newSelectedRowKeys);
          }}
        />
      </Space>
    ),
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={components}
          rowKey="key"
          columns={tableColumns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
            position: ["topRight"],
          }}
          scroll={{ x: 1500 }}
          size="middle"
          bordered
          rowSelection={rowSelection}
          className="resizable-table"
        />
      </SortableContext>
    </DndContext>
  );
};

export default TicketTable;
