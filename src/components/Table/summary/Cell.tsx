import { FC } from "react";
import { Table as AntdTable } from "antd";

const {
  Summary: { Cell: AntdCell },
} = AntdTable;

type AlignType = "left" | "center" | "right";

interface SummaryCellProps {
  className?: string;
  children?: React.ReactNode;
  index: number;
  colSpan?: number;
  rowSpan?: number;
  align?: AlignType;
}

const Cell: FC<SummaryCellProps> = (props) => {
  return <AntdCell {...props} />;
};

export default Cell;
