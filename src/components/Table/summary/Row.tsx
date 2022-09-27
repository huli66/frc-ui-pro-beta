import { FC } from "react";
import { Table as AntdTable } from "antd";

const {
  Summary: { Row: AntdRow },
} = AntdTable;

interface FooterRowProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Row: FC<FooterRowProps> = (props) => {
  return <AntdRow {...props} />;
};

export default Row;
