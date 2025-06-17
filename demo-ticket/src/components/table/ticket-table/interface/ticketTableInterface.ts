import type { ColumnType, ColumnGroupType } from "antd/es/table";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { TableProps } from "antd/es/table";

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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export type { ResizableColumn, RowContextProps, RowProps, ResizableColumnType, TableRowSelection };
