import { FC } from "react";
import { Table } from "antd";

import { ColumnGroupProps } from "antd/lib/table/ColumnGroup";

const { ColumnGroup: AntdColumnGroup } = Table;

export const Column: FC<ColumnGroupProps<any> & { notLast?: boolean }> = (
  props
) => {
  const { ...restProps } = props;

  const options = {
    ...restProps,
  };

  // main
  return <AntdColumnGroup {...options} />;
};

export default Column;
