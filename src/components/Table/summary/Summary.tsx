import { FC } from "react";
import { Table as AntdTable } from "antd";

const { Summary: AntdSummary } = AntdTable;

interface SummaryProps {
  fixed?: boolean | "top" | "bottom";
  children?: React.ReactNode;
}

const Summary: FC<SummaryProps> = (props) => {
  console.log("props", props);

  return <AntdSummary {...props} />;
};

export default Summary;
