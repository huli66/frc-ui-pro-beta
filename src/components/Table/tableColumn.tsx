import { FC } from "react";
import { Table } from "antd";

import { ColumnsTypeProps } from "./table";
import { ColumnProps } from "antd/lib/table";

const { Column: AntdColumn } = Table;

export const Column: FC<ColumnsTypeProps> = (props) => {
  const { ...restProps } = props;

  const options = {
    ...restProps,
  } as ColumnProps<any>;

  // main
  return <AntdColumn {...options} />;
};

export default Column;
