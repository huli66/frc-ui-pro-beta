// for storybook api doc
import { FC } from "react";
import {
  ColumnsTypeProps,
  ExpandableProps,
  PaginationConfig,
  RowSelectionProps,
  SelectionItemProps,
  TableLocaleProps,
} from "./table";

// -----------------------------------------------------------------

const ColumnShowArgsTable: FC<ColumnsTypeProps> = () => <></>;

ColumnShowArgsTable.defaultProps = {
  align: "left",
  filterResetToDefaultFilteredValue: false,
  ellipsis: false,
  filtered: false,
  filterIcon: false,
  filterMultiple: true,
  filterMode: "menu",
  filterSearch: false,
  fixed: false,
  showSorterTooltip: true,
  sortDirections: ["ascend", "descend"],
};

// -----------------------------------------------------------------

const ExpandableShowArgsTable: FC<ExpandableProps> = () => <></>;

ExpandableShowArgsTable.defaultProps = {
  childrenColumnName: "children",
  defaultExpandAllRows: false,
  expandRowByClick: false,
  fixed: false,
  indentSize: 15,
  showExpandColumn: true,
};

// -----------------------------------------------------------------

const PaginationShowArgsTable: FC<PaginationConfig> = () => <></>;

PaginationShowArgsTable.defaultProps = {
  position: ["bottomRight"],
};

// -----------------------------------------------------------------

const RowSelectionShowArgsTable: FC<RowSelectionProps> = () => <></>;

RowSelectionShowArgsTable.defaultProps = {
  checkStrictly: true,
  columnWidth: "32px",
  hideSelectAll: false,
  selectedRowKeys: [],
  defaultSelectedRowKeys: [],
  selections: true,
  type: "checkbox",
};

// -----------------------------------------------------------------

const SelectionItemShowArgsTable: FC<SelectionItemProps> = () => <></>;

SelectionItemShowArgsTable.defaultProps = {};

// -----------------------------------------------------------------

const TableLocaleShowArgsTable: FC<TableLocaleProps> = () => <></>;

TableLocaleShowArgsTable.defaultProps = {};

// -----------------------------------------------------------------

export {
  ColumnShowArgsTable,
  ExpandableShowArgsTable,
  PaginationShowArgsTable,
  RowSelectionShowArgsTable,
  SelectionItemShowArgsTable,
  TableLocaleShowArgsTable,
};
