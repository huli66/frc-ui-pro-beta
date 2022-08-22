import FRCTable from "./table";
import { FRCSummary, FRCRow, FRCCell } from "./summary";

import { Table } from "antd";

type FRCTableSummaryProps = typeof FRCSummary & {
  Row: typeof FRCRow;
  Cell: typeof FRCCell;
};

type FRCTableComponent = typeof FRCTable & {
  Summary: FRCTableSummaryProps;
  SELECTION_ALL: any;
  SELECTION_INVERT: any;
  SELECTION_NONE: any;
};

const TransTable = FRCTable as FRCTableComponent;

// Trans...
TransTable.Summary = Table.Summary as FRCTableSummaryProps; // ?
TransTable.Summary.Row = FRCRow;
TransTable.Summary.Cell = FRCCell;

TransTable.SELECTION_ALL = Table.SELECTION_ALL;
TransTable.SELECTION_INVERT = Table.SELECTION_INVERT;
TransTable.SELECTION_NONE = Table.SELECTION_NONE;

export default TransTable;
