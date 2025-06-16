"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useState, useEffect } from "react";
import { Table, Button, Space, Tooltip, Checkbox } from "antd";
import type { TableProps } from "antd/es/table";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import Status from "../icons/Status";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import ColumnDisplayPopOver from "../pop-overs/ColumnDisplayPopOver";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "@/store/reducers/ticketReducer";
import type { RootState } from "@/store/rootReducer";
import type { Ticket } from "@/store/interfaces/ticket";
import type { AppDispatch } from "@/store/index";
import Score from "../format/Score";
import { dumpApi } from "@/utilities/dumpApi";
import PcTag from "../tags/PcTag";
import DateTag from "../tags/DateTag";

interface ResizableColumnType<RecordType>
  extends Omit<ColumnType<RecordType>, "width"> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface ResizableColumnGroupType<RecordType>
  extends Omit<ColumnGroupType<RecordType>, "width"> {
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
      className="drag-handle-button"
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
  const {
    onResize,
    width,
    minWidth,
    maxWidth,
    resizable = true,
    ...restProps
  } = props;

  if (!width || !resizable) {
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

const defaultCheckedList = [
  "id",
  "title",
  "content",
  "pc_id",
  "location",
  "status",
  "user_id",
  "handle",
  "date",
  "rating",
  "difficulty",
  "feedback",
  "team",
  "email",
  "gmail",
];

const TicketTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { tickets: reduxTickets, loading: reduxLoading } = useSelector((state: RootState) => state.ticket);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await dumpApi.getAllTickets();
        setTickets(data);
        // dispatch(getAllTickets({})); // Comment out Redux dispatch
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getBaseColumns = (): ResizableColumn<Ticket>[] => [
    {
      title: "📌 ID",
      dataIndex: "id",
      key: "id",
      width: columnWidths["id"] || 70,
      minWidth: 70,
      maxWidth: 70,
      fixed: "left",
      render: (id) =>
        id && (
          <Space>
            <p className="paragraph-normal-style">TIC-IT-{id}</p>
          </Space>
        ),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "📈 Status",
      dataIndex: "status",
      key: "status",
      width: columnWidths["status"] || 100,
      minWidth: 100,
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
      title: "🏷️ Title",
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
      title: "📝 Content",
      dataIndex: "content",
      key: "content",
      width: columnWidths["content"] || 300,
      minWidth: 250,
      maxWidth: 600,
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: "💻 PC ID",
      dataIndex: "pc_id",
      key: "pc_id",
      width: columnWidths["pc_id"] || 100,
      minWidth: 80,
      maxWidth: 150,
      render: (pc_id) => (
        <Space>
          <PcTag pc_id={pc_id} />
        </Space>
      ),
    },
    {
      title: "📍 Location",
      dataIndex: "location",
      key: "location",
      width: columnWidths["location"] || 150,
      minWidth: 120,
      maxWidth: 250,
    },
    {
      title: "🛠️ Assignee",
      dataIndex: "handle",
      key: "handle",
      width: columnWidths["handle"] || 150,
      minWidth: 120,
      maxWidth: 250,
    },
    {
      title: "👤 Reporter",
      dataIndex: "user_id",
      key: "user_id",
      width: columnWidths["user_id"] || 150,
      minWidth: 120,
      maxWidth: 250,
    },
    {
      title: "📅 Date",
      dataIndex: "date",
      key: "date",
      width: columnWidths["date"] || 120,
      minWidth: 100,
      maxWidth: 200,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date) => <DateTag date={date} />,
    },
    {
      title: "🌟 Rating",
      dataIndex: "rating",
      key: "rating",
      width: columnWidths["rating"] || 70,
      minWidth: 60,
      maxWidth: 100,
      render: (rating) =>
        rating && (
          <Space>
            <Score rating={rating} />
          </Space>
        ),
    },
    {
      title: "💀 Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: columnWidths["difficulty"] || 70,
      minWidth: 60,
      maxWidth: 100,
      render: (difficulty) =>
        difficulty && (
          <Space>
            <Score rating={difficulty} />
          </Space>
        ),
    },
    {
      title: "📢 Feedback",
      dataIndex: "feedback",
      key: "feedback",
      width: columnWidths["feedback"] || 200,
      minWidth: 150,
      maxWidth: 400,
      ellipsis: {
        showTitle: false,
      },
      render: (feedback) => (
        <Tooltip placement="topLeft" title={feedback}>
          {feedback}
        </Tooltip>
      ),
    },
    {
      title: "👥 Team",
      dataIndex: "team",
      key: "team",
      width: columnWidths["team"] || 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      title: "📧 Email",
      dataIndex: "email",
      key: "email",
      width: columnWidths["email"] || 200,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      title: "📩 Gmail",
      dataIndex: "gmail",
      key: "gmail",
      width: columnWidths["gmail"] || 200,
      minWidth: 150,
      maxWidth: 300,
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
      align: "center",
    },
  ];

  const columns = getBaseColumns().map((col) => ({
    ...col,
    hidden:
      col.key === "id" || col.key === "action"
        ? false
        : !checkedList.includes(col.key as string),
  }));

  const handleResize =
    (index: number) =>
    (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
      const column = getBaseColumns()[index] as ResizableColumnType<Ticket>;
      const newWidth = Math.min(
        Math.max(size.width, column.minWidth || 50),
        column.maxWidth || 500
      );

      setColumnWidths((prev) => ({
        ...prev,
        [column.key as string]: newWidth,
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
    onHeaderCell: (column: ResizableColumn<Ticket>) => ({
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      onResize: handleResize(index),
    }),
  })) as ColumnType<Ticket>[];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = tickets.findIndex(
        (record) => record.id === active?.id
      );
      const overIndex = tickets.findIndex((record) => record.id === over?.id);
      // Note: Since we're using Redux, we should dispatch an action to update the order
      // This is just for UI demonstration
      console.log("Drag end:", { activeIndex, overIndex });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Ticket> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 50,
    fixed: "left",
    columnTitle: () => (
      <Checkbox
        checked={selectedRowKeys.length === tickets.length}
        indeterminate={
          selectedRowKeys.length > 0 && selectedRowKeys.length < tickets.length
        }
        onChange={(e) => {
          const newSelectedRowKeys = e.target.checked
            ? tickets.map((item) => item.id)
            : [];
          onSelectChange(newSelectedRowKeys);
        }}
      />
    ),
    renderCell: (checked, record) => (
      <Space>
        <DragHandle />
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => {
            const newSelectedRowKeys = e.target.checked
              ? [...selectedRowKeys, record.id]
              : selectedRowKeys.filter((key) => key !== record.id);
            onSelectChange(newSelectedRowKeys);
          }}
        />
      </Space>
    ),
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={tickets.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={components}
          rowKey="id"
          columns={tableColumns}
          dataSource={tickets}
          pagination={{
            pageSize: 10,
            position: ["topRight"],
          }}
          scroll={{ x: 3200, y: 75 * 5 }}
          size="middle"
          bordered
          rowSelection={rowSelection}
          className="resizable-table"
          loading={loading}
        />
      </SortableContext>
    </DndContext>
  );
};

export default TicketTable;
