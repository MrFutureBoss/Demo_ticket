"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Table, Button, Space, Tooltip, Checkbox } from "antd";
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
import Status from "../../icons/Status";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import ColumnDisplayPopOver from "../../pop-overs/ColumnDisplayPopOver";
import type { Ticket } from "@/store/interfaces/ticket";
import Score from "../../format/Score";
import PcTag from "../../tags/PcTag";
import DateTag from "../../tags/DateTag";
import readHTML from "@/utilities/convert/readHTML";
import TextAvatar from "../../avatars/TextAvatar";
import DescriptionTooltip from "../../tooltips/DescriptionTooltip";
import {
  RowContextProps,
  ResizableColumn,
  RowProps,
  ResizableColumnType,
  TableRowSelection,
} from "./interface/ticketTableInterface";
import { defaultCheckedList } from "./constants";
import { useTickets } from "@/hooks/useTickets";
import TicketDetailModal from "@/components/modals/TicketDetailModal";
import { useDispatch } from "react-redux";
import {
  setOpenTicketDetail,
  setTicketDetail,
} from "@/store/reducers/modalReducer";
import Difficulty from "@/components/icons/Difficulty";

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

const TicketTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    {}
  );
  const [scrollWidth, setScrollWidth] = useState(3200);
  const [loadTime, setLoadTime] = useState<number>(0);
  const [dataSize, setDataSize] = useState<number>(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    total: 0,
    total_pages: 0,
  });

  const {
    tickets: swrTickets,
    isLoading: swrLoading,
    pagination: swrPagination,
  } = useTickets({
    page: pagination.page,
    page_size: pagination.page_size,
  });

  const dispatch = useDispatch();

  const measurePerformance = (data: any[]) => {
    const dataSizeInBytes = new Blob([JSON.stringify(data)]).size;
    setDataSize(dataSizeInBytes / 1024);
  };

  // Tính toán scroll width dựa trên các cột được hiển thị
  const calculateScrollWidth = useCallback(
    (visibleColumns: string[]) => {
      const baseColumns = getBaseColumns();
      let totalWidth = 0;

      // Luôn tính width cho cột ID và Action
      totalWidth += (columnWidths["id"] || 90) + 24;

      // Tính width cho các cột được chọn
      visibleColumns.forEach((key) => {
        const column = baseColumns.find((col) => col.key === key);
        if (column) {
          const columnWidth = columnWidths[key] || column.width || 0;
          totalWidth += columnWidth;
        }
      });

      // Thêm padding và margin
      totalWidth += 50;
      return totalWidth;
    },
    [columnWidths]
  );

  // Cập nhật checkedList và tính toán lại scroll width
  const handleCheckedListChange = useCallback(
    (newCheckedList: string[]) => {
      setCheckedList(newCheckedList);
      const newScrollWidth = calculateScrollWidth(newCheckedList);
      setScrollWidth(newScrollWidth);
    },
    [calculateScrollWidth]
  );

  // Lưu trữ column widths vào localStorage
  useEffect(() => {
    const savedColumnWidths = localStorage.getItem("columnWidths");
    if (savedColumnWidths) {
      setColumnWidths(JSON.parse(savedColumnWidths));
    }
  }, []);

  // Cập nhật localStorage khi column widths thay đổi
  useEffect(() => {
    localStorage.setItem("columnWidths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    if (swrTickets.length > 0) {
      const startTime = performance.now();
      measurePerformance(swrTickets);
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
    }
  }, [swrTickets]);

  useEffect(() => {
    if (swrPagination) {
      setPagination((prev) => ({
        ...prev,
        total: swrPagination.total,
        total_pages: swrPagination.total_pages,
      }));
    }
  }, [swrPagination]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination((prev) => ({
      ...prev,
      page: pagination.current,
      page_size: pagination.pageSize,
    }));
  };

  const getBaseColumns = useCallback(
    (): ResizableColumn<Ticket>[] => [
      {
        title: "📌 ID",
        dataIndex: "id",
        key: "id",
        width: 120,
        minWidth: 50,
        maxWidth: 200,
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
        minWidth: 50,
        maxWidth: 200,
        filters: [
          { text: "Open", value: 1 },
          { text: "In Progress", value: 2 },
          { text: "Completed", value: 3 },
          { text: "In Review", value: 4 },
          { text: "On Hold", value: 5 },
          { text: "Pending", value: 6 },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status) => <Status status={status} />,
      },
      {
        title: "🏷️ Title",
        dataIndex: "title",
        key: "title",
        width: columnWidths["title"] || 100,
        minWidth: 60,
        maxWidth: 180,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(swrTickets.map((ticket) => ticket.title))
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
        width: columnWidths["content"] || 350,
        minWidth: 50,
        maxWidth: 500,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(swrTickets.map((ticket) => ticket.content))
        ).map((content) => ({
          text: content,
          value: content,
        })),
        onFilter: (value, record) => record.content.includes(value as string),
        ellipsis: true,
        render: (content) => (
          <DescriptionTooltip description={readHTML(content)} />
        ),
      },
      {
        title: "💻 PC ID",
        dataIndex: "pc_id",
        key: "pc_id",
        width: columnWidths["pc_id"] || 100,
        minWidth: 50,
        maxWidth: 200,
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
        minWidth: 60,
        maxWidth: 240,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(
            swrTickets
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
        width: columnWidths["handle"] || 180,
        minWidth: 90,
        maxWidth: 360,
        render: (handle, record) =>
          handle &&
          (record.coworker ? (
            <Space>{record.coworker}</Space>
          ) : (
            <Space>
              <TextAvatar
                employeeId={record.handle}
                fullname={record.handler_name}
              />
            </Space>
          )),
      },
      {
        title: "👤 Reporter",
        dataIndex: "user_id",
        key: "user_id",
        width: columnWidths["user_id"] || 180,
        minWidth: 90,
        maxWidth: 360,
        render: (user_id, record) =>
          user_id && (
            <Space>
              <TextAvatar
                employeeId={record.user_id}
                fullname={record.fullname}
              />
            </Space>
          ),
      },
      {
        title: "📅 Receive Date",
        dataIndex: "receive_date",
        key: "receive_date",
        width: columnWidths["receive_date"] || 120,
        minWidth: 60,
        maxWidth: 240,
        sorter: (a, b) =>
          new Date(a.receive_date).getTime() -
          new Date(b.receive_date).getTime(),
        render: (receive_date) => <DateTag date={receive_date} />,
      },
      {
        title: "🕒 Last Update",
        dataIndex: "date",
        key: "date",
        width: columnWidths["date"] || 120,
        minWidth: 60,
        maxWidth: 240,
        sorter: (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
        render: (date) => <DateTag date={date} />,
      },
      {
        title: "🌟 Rating",
        dataIndex: "rating",
        key: "rating",
        width: columnWidths["rating"] || 70,
        minWidth: 35,
        maxWidth: 140,
        filters: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
          { text: "4", value: 4 },
          { text: "5", value: 5 },
        ],
        onFilter: (value, record) => record.rating === value,
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
        minWidth: 35,
        maxWidth: 140,
        filters: [
          { text: "Lowest", value: 1 },
          { text: "Low", value: 2 },
          { text: "Medium", value: 3 },
          { text: "High", value: 4 },
          { text: "Highest", value: 5 },
        ],
        onFilter: (value, record) => record.difficulty === value,
        render: (difficulty) =>
          difficulty && (
            <Space>
              <Difficulty difficulty={difficulty} />
            </Space>
          ),
      },
      {
        title: "📢 Feedback",
        dataIndex: "feedback",
        key: "feedback",
        width: columnWidths["feedback"] || 200,
        minWidth: 100,
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
        width: columnWidths["team"] || 150,
        minWidth: 60,
        maxWidth: 240,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(
            swrTickets
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
        minWidth: 100,
        maxWidth: 400,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(swrTickets.map((ticket) => ticket.email))
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
        minWidth: 100,
        maxWidth: 400,
        filterMode: "menu",
        filterSearch: true,
        filters: Array.from(
          new Set(swrTickets.map((ticket) => ticket.gmail))
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
        minWidth: 12,
        maxWidth: 48,
        fixed: "right",
        align: "center",
      },
    ],
    [columnWidths, checkedList]
  );

  const handleResize = useCallback(
    (index: number) =>
      (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
        const column = getBaseColumns()[index] as ResizableColumnType<Ticket>;
        const newWidth = Math.min(
          Math.max(size.width, column.minWidth || 50),
          column.maxWidth || 500
        );

        setColumnWidths((prev) => {
          const newWidths = {
            ...prev,
            [column.key as string]: newWidth,
          };
          return newWidths;
        });
      },
    [getBaseColumns]
  );

  const visibleColumns = useMemo(() => {
    return getBaseColumns().map((col) => ({
      ...col,
      hidden:
        col.key === "id" || col.key === "action"
          ? false
          : !checkedList.includes(col.key as string),
    }));
  }, [getBaseColumns, checkedList]);

  const tableColumns = useMemo(() => {
    return visibleColumns.map((col, index) => ({
      ...col,
      onHeaderCell: (column: ResizableColumn<Ticket>) => ({
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        onResize: handleResize(index),
      }),
    })) as ColumnType<Ticket>[];
  }, [visibleColumns, handleResize]);

  const components = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      wrapper: ({ children, ...props }: any) => (
        <tbody {...props}>
          <SortableContext
            items={swrTickets.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {children}
          </SortableContext>
        </tbody>
      ),
      row: Row,
    },
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = swrTickets.findIndex(
        (record) => record.id === active?.id
      );
      const overIndex = swrTickets.findIndex(
        (record) => record.id === over?.id
      );
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
        checked={selectedRowKeys.length === swrTickets.length}
        indeterminate={
          selectedRowKeys.length > 0 &&
          selectedRowKeys.length < swrTickets.length
        }
        onChange={(e) => {
          const newSelectedRowKeys = e.target.checked
            ? swrTickets.map((item) => item.id)
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

  const onRow = (record: Ticket) => ({
    onClick: () => {
      dispatch(setTicketDetail(record));
      dispatch(setOpenTicketDetail(true));
    },
    style: { cursor: "pointer" },
  });

  return (
    <>
      <TicketDetailModal />
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <div className="table-performance-info">
          <div>
            Load time:{" "}
            <span
              className={
                loadTime > 1000 || loadTime === 0
                  ? "text-danger font-weight-bold"
                  : "text-success font-weight-bold"
              }
            >
              {loadTime.toFixed(2)}&nbsp;ms
            </span>
          </div>
          <div>
            Data size:{" "}
            <span
              className={
                dataSize > 1000 || dataSize === 0
                  ? "text-danger font-weight-bold"
                  : "text-success font-weight-bold"
              }
            >
              {dataSize.toFixed(2)}&nbsp;KB
            </span>
          </div>
          <div>
            Total: <span>{pagination.total}</span>
          </div>
        </div>
        <Table
          components={components}
          rowKey="id"
          columns={tableColumns}
          dataSource={swrTickets as unknown as readonly Ticket[]}
          onRow={onRow}
          pagination={{
            current: pagination.page,
            pageSize: pagination.page_size,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
            position: ["topRight"],
            onChange: (page, pageSize) => {
              setIsPageLoading(true);
              setPagination((prev) => ({
                ...prev,
                page,
                page_size: pageSize,
              }));
              setIsPageLoading(false);
            },
          }}
          scroll={{ x: 3800, y: 75 * 5 }}
          size="middle"
          bordered
          rowSelection={rowSelection}
          className="resizable-table"
          loading={swrLoading || isPageLoading}
        />
      </DndContext>
    </>
  );
};

export default TicketTable;
