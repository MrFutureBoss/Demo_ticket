"use client";
import React, { useContext, useMemo } from "react";
import { Table, Button, Space, Tooltip, Checkbox } from "antd";
import type { TableProps } from "antd/es/table";
import { HolderOutlined, PlusOutlined } from "@ant-design/icons";
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

interface ResizableColumnType<RecordType> extends ColumnType<RecordType> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface ResizableColumnGroupType<RecordType>
  extends ColumnGroupType<RecordType> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

type ResizableColumn<RecordType> =
  | ResizableColumnType<RecordType>
  | ResizableColumnGroupType<RecordType>;

interface DataType {
  key: string;
  ticketId: string;
  status: number;
  assignee: string;
  reporter: string;
  description: string;
}

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

const generateData = (): DataType[] => {
  const data: DataType[] = [];
  const statuses = [1, 2, 3, 4, 5, 6];
  const assignees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];
  const reporters = ["Alice Brown", "Bob Davis", "Carol Evans", "David Miller"];

  // Shuffle statuses array to ensure random distribution
  const shuffledStatuses = [...statuses].sort(() => Math.random() - 0.5);

  for (let i = 1; i <= 20; i++) {
    data.push({
      key: i.toString(),
      ticketId: `IT-TIC-${String(i).padStart(5, "0")}`,
      status: shuffledStatuses[i % statuses.length],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      reporter: reporters[Math.floor(Math.random() * reporters.length)],
      description: `This is a sample ticket description ${i} with some additional details about the issue.`,
    });
  }
  return data;
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
  const [dataSource, setDataSource] = React.useState<DataType[]>(
    generateData()
  );
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [columns, setColumns] = React.useState<ResizableColumn<DataType>[]>([
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      fixed: "left",
      sorter: (a, b) => a.ticketId.localeCompare(b.ticketId),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      minWidth: 100,
      maxWidth: 150,
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
      title: "Assignee",
      dataIndex: "assignee",
      width: 150,
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
      width: 150,
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
      width: 300,
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
      title: <PlusOutlined />,
      key: "action",
      width: 24,
      minWidth: 24,
      maxWidth: 24,
      fixed: "right",
      onCell: () => ({
        style: {
          display: "none",
        },
      }),
    },
  ]);

  const handleResize =
    (index: number) =>
    (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
      const column = columns[index] as ResizableColumnType<DataType>;
      const newWidth = Math.min(
        Math.max(size.width, column.minWidth || 50),
        column.maxWidth || 500
      );

      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = { ...nextColumns[index], width: newWidth };
        return nextColumns;
      });
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
  }));

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
