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
import readHTML from "@/utilities/convert/readHTML";
import TextAvatar from "../avatars/TextAvatar";
import DescriptionTooltip from "../tooltips/DescriptionTooltip";

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
  "status",
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
  const { tickets: reduxTickets, loading: reduxLoading, pagination } = useSelector(
    (state: RootState) => state.ticket
  );
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});
  const [scrollWidth, setScrollWidth] = useState(3200);
  const [loadTime, setLoadTime] = useState<number>(0);
  const [dataSize, setDataSize] = useState<number>(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const measurePerformance = (data: any[]) => {
    // Tính kích thước dữ liệu
    const dataSizeInBytes = new Blob([JSON.stringify(data)]).size;
    setDataSize(dataSizeInBytes / 1024);
  };

  // Tính toán scroll width dựa trên các cột được hiển thị
  const calculateScrollWidth = (visibleColumns: string[]) => {
    const baseColumns = getBaseColumns();
    let totalWidth = 0;

    // Luôn tính width cho cột ID và Action
    totalWidth += (columnWidths["id"] || 70) + 24;

    // Tính width cho các cột được chọn
    visibleColumns.forEach((key) => {
      const column = baseColumns.find((col) => col.key === key);
      if (column) {
        totalWidth += columnWidths[key] || column.width || 0;
      }
    });

    // Thêm padding và margin
    totalWidth += 100;
    setScrollWidth(totalWidth);
  };

  // Cập nhật checkedList và tính toán lại scroll width
  const handleCheckedListChange = (newCheckedList: string[]) => {
    setCheckedList(newCheckedList);
    calculateScrollWidth(newCheckedList);
  };

  useEffect(() => {
    const startTime = performance.now();
    dispatch(getAllTickets({ page: 1, page_size: 20 }))
      .unwrap()
      .then((response) => {
        const endTime = performance.now();
        setLoadTime(endTime - startTime);
        measurePerformance(response.tickets);
      });
  }, [dispatch]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const startTime = performance.now();
    dispatch(
      getAllTickets({
        page: pagination.current,
        page_size: pagination.pageSize,
      })
    )
      .unwrap()
      .then((response) => {
        const endTime = performance.now();
        setLoadTime(endTime - startTime);
        measurePerformance(response.tickets);
      });
  };

  const getBaseColumns = (): ResizableColumn<Ticket>[] => [
    {
      title: "📌 ID",
      dataIndex: "id",
      key: "id",
      width: columnWidths["id"] || 90,
      minWidth: 70,
      maxWidth: 150,
      fixed: "left",
      render: (id, record) =>
        id && (
          <Space>
            <p className="paragraph-normal-style">
              TIC-{record.type === "HR" ? "HR" : "IT"}-{id}
            </p>
          </Space>
        ),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "📊 Status",
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
        { text: "Pending", value: 6 },
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
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(reduxTickets.map((ticket) => ticket.title))
      ).map((title) => ({
        text: title,
        value: title,
      })),
      onFilter: (value, record) => record.title.includes(value as string),
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
      minWidth: 200,
      maxWidth: 400,
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(reduxTickets.map((ticket) => ticket.content))
      ).map((content) => ({
        text: content,
        value: content,
      })),
      onFilter: (value, record) => record.content.includes(value as string),
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <DescriptionTooltip description={readHTML(content)} />
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
      width: columnWidths["location"] || 120,
      minWidth: 100,
      maxWidth: 150,
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(
          reduxTickets
            .filter((ticket) => ticket.location !== null)
            .map((ticket) => ticket.location)
        )
      ).map((location) => ({
        text: location,
        value: location,
      })),
      onFilter: (value, record) => record.location.includes(value as string),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "🛠️ Assignee",
      dataIndex: "handle",
      key: "handle",
      width: columnWidths["handle"] || 150,
      minWidth: 120,
      maxWidth: 250,
      render: (handle) => (
        <Space>
          <TextAvatar employeeId={handle} fullname="Test" />
        </Space>
      ),
    },
    {
      title: "👤 Reporter",
      dataIndex: "user_id",
      key: "user_id",
      width: columnWidths["user_id"] || 150,
      minWidth: 120,
      maxWidth: 250,
      render: (user_id) => (
        <Space>
          <TextAvatar employeeId={user_id} fullname="Test" />
        </Space>
      ),
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
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(
          reduxTickets
            .filter((ticket) => ticket.team !== null)
            .map((ticket) => ticket.team)
        )
      ).map((team) => ({
        text: team,
        value: team,
      })),
      onFilter: (value, record) => record.team.includes(value as string),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "📧 Email",
      dataIndex: "email",
      key: "email",
      width: columnWidths["email"] || 200,
      minWidth: 150,
      maxWidth: 250,
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(reduxTickets.map((ticket) => ticket.email))
      ).map((email) => ({
        text: email,
        value: email,
      })),
      onFilter: (value, record) => record.email.includes(value as string),
    },
    {
      title: "📩 Gmail",
      dataIndex: "gmail",
      key: "gmail",
      width: columnWidths["gmail"] || 200,
      minWidth: 150,
      maxWidth: 250,
      filterMode: "menu",
      filterSearch: true,
      filters: Array.from(
        new Set(reduxTickets.map((ticket) => ticket.gmail))
      ).map((gmail) => ({
        text: gmail,
        value: gmail,
      })),
      onFilter: (value, record) => record.gmail.includes(value as string),
    },
    {
      title: (
        <ColumnDisplayPopOver
          checkedList={checkedList}
          onCheckedListChange={handleCheckedListChange}
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
      const activeIndex = reduxTickets.findIndex(
        (record) => record.id === active?.id
      );
      const overIndex = reduxTickets.findIndex(
        (record) => record.id === over?.id
      );
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
        checked={selectedRowKeys.length === reduxTickets.length}
        indeterminate={
          selectedRowKeys.length > 0 &&
          selectedRowKeys.length < reduxTickets.length
        }
        onChange={(e) => {
          const newSelectedRowKeys = e.target.checked
            ? reduxTickets.map((item) => item.id)
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
      <div className="table-performance-info">
        <span>Load time: {loadTime.toFixed(2)}ms</span>
        <span>Data size: {dataSize.toFixed(2)}KB</span>
      </div>
      <SortableContext
        items={reduxTickets.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={components}
          rowKey="id"
          columns={tableColumns}
          dataSource={reduxTickets}
          pagination={{
            current: pagination?.page,
            pageSize: pagination?.page_size,
            total: pagination?.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
            position: ["topRight"],
            onChange: (page, pageSize) => {
              setIsPageLoading(true);
              const startTime = performance.now();
              dispatch(
                getAllTickets({
                  page,
                  page_size: pageSize,
                })
              )
                .unwrap()
                .then((response) => {
                  const endTime = performance.now();
                  setLoadTime(endTime - startTime);
                  measurePerformance(response.tickets);
                })
                .finally(() => {
                  setIsPageLoading(false);
                });
            },
          }}
          scroll={{ x: scrollWidth, y: 75 * 5 }}
          size="middle"
          bordered
          rowSelection={rowSelection}
          className="resizable-table"
          loading={reduxLoading || isPageLoading}
        />
      </SortableContext>
    </DndContext>
  );
};

export default TicketTable;
