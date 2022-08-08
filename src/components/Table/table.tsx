import React, { FC } from "react";
import classNames from "classnames";
import { Table as AntdTable, TableProps } from "antd";

export const Table: FC<TableProps<any>> = (props) => {
  const { className, ...restProps } = props;
  // btn, btn-lg, btn-primary
  const classes = classNames("frc-table", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <AntdTable {...options} />;
};

// normal
Table.defaultProps = {};

export default Table;
