import FRCTable from "./table";
import { FRCSummary, FRCRow, FRCCell } from "./summary";

import { Table } from "antd";

type FRCTableSummaryProps = typeof FRCSummary & {
  Row: typeof FRCRow;
  Cell: typeof FRCCell;
};

type FRCTableComponent = typeof FRCTable & {
  Summary: FRCTableSummaryProps;
};

const TransTable = FRCTable as FRCTableComponent;

// Trans...
TransTable.Summary = Table.Summary as FRCTableSummaryProps; // ?
TransTable.Summary.Row = FRCRow;
TransTable.Summary.Cell = FRCCell;

export default TransTable;
