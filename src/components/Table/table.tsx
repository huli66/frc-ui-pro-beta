import React, { FC, ReactNode, Key } from "react";
import classNames from "classnames";
import {
  Table as AntdTable,
  TableProps,
  TooltipProps,
  SpinProps,
  CheckboxProps,
} from "antd";
import { ColumnProps } from "antd/lib/table";
import {
  FilterDropdownProps,
  ColumnFilterItem,
  ExpandableConfig,
  TableLocale,
  TablePaginationConfig,
  TableRowSelection,
  SelectionItem,
  FilterValue,
  SorterResult,
} from "antd/lib/table/interface";

import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  BackwardOutlined,
} from "@ant-design/icons";

import {
  ItemRender,
  replaceIcon as PaginationReplaceIcon,
} from "../Pagination/pagination";

type RecordType = object;
type CompareFn<T> = (
  a: T,
  b: T,
  sortOrder?: "descend" | "ascend" | null
) => number;

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;
type CustomizeComponent = Component<any>;

export type CustomizeScrollBody<RecordType> = (
  data: readonly RecordType[],
  info: {
    scrollbarSize: number;
    ref: React.Ref<{
      scrollLeft: number;
    }>;
    onScroll: (info: {
      currentTarget?: HTMLElement;
      scrollLeft?: number;
    }) => void;
  }
) => React.ReactNode;

export interface TableComponents<RecordType> {
  table?: CustomizeComponent;
  header?: {
    wrapper?: CustomizeComponent;
    row?: CustomizeComponent;
    cell?: CustomizeComponent;
  };
  body?:
    | CustomizeScrollBody<RecordType>
    | {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
      };
}

export interface ColumnsTypeProps extends ColumnProps<RecordType> {
  /** 设置列的对齐方式 */
  align?: "left" | "right" | "center";
  /** 列样式类名 */
  className?: string;
  /** 表头列合并,设置为 0 时，不渲染 */
  colSpan?: number;
  /** 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 */
  dataIndex?: string | string[];
  /** 默认筛选值 */
  defaultFilteredValue?: string[];
  /** 点击重置按钮的时候，是否恢复默认筛选值 */
  filterResetToDefaultFilteredValue?: boolean;
  /** 默认排序顺序 */
  defaultSortOrder?: "ascend" | "descend";
  /** 超过宽度将自动省略，暂不支持和排序筛选一起使用。设置为 true 或 { showTitle?: boolean } 时，表格布局将变成 tableLayout="fixed"。 */
  ellipsis?: boolean | { showTitle?: boolean };
  /** 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 */
  filterDropdown?: ReactNode | ((props: FilterDropdownProps) => ReactNode);
  /** 用于控制自定义筛选菜单是否可见 */
  filterDropdownVisible?: boolean;
  /** 标识数据是否经过过滤，筛选图标会高亮 */
  filtered?: boolean;
  /** 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 */
  filteredValue?: string[];
  /** 自定义 filter 图标。 */
  filterIcon?: ReactNode | ((filtered: boolean) => ReactNode);
  /** 是否多选 */
  filterMultiple?: boolean;
  /** 指定筛选菜单的用户界面 */
  filterMode?: "menu" | "tree";
  /** 筛选菜单项是否可搜索 */
  filterSearch?: boolean | ((input: string, record: RecordType) => boolean);
  /** 表头的筛选菜单项 */
  filters?: ColumnFilterItem[];
  /** （IE 下无效）列是否固定，可选 true (等效于 left) left right */
  fixed?: "left" | "right" | boolean;
  /** React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 */
  key?: string;
  /** 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 */
  render?: (text: string, record: RecordType, index: number) => ReactNode;
  /** 响应式 breakpoint 配置列表。未设置则始终可见。 */
  responsive?: ("xxl" | "xl" | "lg" | "md" | "sm" | "xs")[];
  /** 自定义单元格渲染时机 */
  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
  /** 表头显示下一次排序的 tooltip 提示, 覆盖 table 中 showSorterTooltip */
  showSorterTooltip?: boolean | TooltipProps;
  /** 支持的排序方式，覆盖 Table 中 sortDirections， 取值为 ascend descend */
  sortDirections?: ("descend" | "ascend" | null)[];
  /** 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true */
  sorter?:
    | boolean
    | CompareFn<RecordType>
    | {
        compare?: CompareFn<RecordType>;
        /** Config multiple sorter order priority */
        multiple?: number;
      };
  /** 排序的受控属性，外界可用此控制列的排序，可设置为 ascend descend false */
  sortOrder?: "descend" | "ascend" | null;
  /** 列头显示文字（函数用法 3.10.0 后支持） */
  title?:
    | ReactNode
    | (({
        sortOrder,
        sortColumn,
        filters,
      }: {
        sortOrder: "descend" | "ascend" | null;
        sortColumn: object;
        filters: ColumnFilterItem[];
      }) => ReactNode);
  /** 列宽度（指定了也不生效？看 antd 官方文档） */
  width?: string | number;
  /** 设置单元格属性 */
  onCell?: (record?: RecordType, rowIndex?: number) => any;
  /** 本地模式下，确定筛选的运行函数 */
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
  /** 自定义筛选菜单可见变化时调用 */
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  /** 设置头部单元格属性 */
  onHeaderCell?: (column: object) => any;
}

export interface ExpandableProps extends ExpandableConfig<RecordType> {
  /** 展开行的 key 数组 */
  childrenColumnName?: string;
  /** 自定义展开列宽度 */
  columnWidth?: string | number;
  /** 初始时，是否展开所有行 */
  defaultExpandAllRows?: boolean;
  /** 默认展开的行 */
  defaultExpandedRowKeys?: string[];
  /** 展开行的 className */
  expandedRowClassName?: (
    record: RecordType,
    index: number,
    indent: number
  ) => string;
  /** 展开的行，控制属性 */
  expandedRowKeys?: string[];
  /** 额外的展开行 */
  expandedRowRender?: (
    record: RecordType,
    index: number,
    indent: number
  ) => ReactNode;
  /** 自定义展开图标，参考示例 */
  expandIcon?: (props: {
    prefixCls: string;
    expanded: boolean;
    record: RecordType;
    expandable: boolean;
    onExpand: (
      record: RecordType,
      event: React.MouseEvent<HTMLElement>
    ) => void;
  }) => ReactNode;
  /** 通过点击行来展开子行 */
  expandRowByClick?: boolean;
  /** 控制展开图标是否固定，可选 true left right */
  fixed?: "left" | "right" | boolean;
  /** 展示树形数据时，每层缩进的宽度，以 px 为单位 */
  indentSize?: number;
  /** 设置是否允许行展开 */
  rowExpandable?: (record: RecordType) => boolean;
  /** 设置是否展示行展开列 */
  showExpandColumn?: boolean;
  /** 点击展开图标时触发 */
  onExpand?: (expanded: boolean, record: RecordType) => void;
  /** 展开的行变化时触发 */
  onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
}

export interface PaginationConfig extends TablePaginationConfig {
  /** 指定分页显示的位置， 取值为topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight */
  position?: (
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
  )[];
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    element: React.ReactNode
  ) => React.ReactNode;
}

export interface SelectionItemProps extends SelectionItem {
  /** React 需要的 key，建议设置 */
  key: string;
  /** 选择项显示的文字 */
  text: ReactNode;
  /** 选择项点击回调 */
  onSelect?: (currentRowKeys: Key[]) => void;
}

export interface RowSelectionProps extends TableRowSelection<RecordType> {
  /** checkable 状态下节点选择完全受控（父子数据选中状态不再关联） */
  checkStrictly?: boolean;
  /** 自定义列表选择框标题 */
  columnTitle?: ReactNode;
  /** 自定义列表选择框宽度 */
  columnWidth?: string | number;
  /** 把选择框列固定在左边 */
  fixed?: boolean;
  /** 选择框的默认属性配置 */
  getCheckboxProps?: (
    record: RecordType
  ) => Partial<Omit<CheckboxProps, "checked" | "defaultChecked">>;
  /** 隐藏全选勾选框与自定义选择项 */
  hideSelectAll?: boolean;
  /** 当数据被删除时仍然保留选项的 key */
  preserveSelectedRowKeys?: boolean;
  /** 渲染勾选框，用法与 Column 的 render 相同 */
  renderCell?: (
    value: boolean,
    record: RecordType,
    index: number,
    originNode: React.ReactNode
  ) =>
    | React.ReactNode
    | {
        props?: object;
        children?: React.ReactNode;
      };
  /** 指定选中项的 key 数组，需要和 onChange 进行配合 */
  selectedRowKeys?: string[] | number[];
  /** 默认选中项的 key 数组 */
  defaultSelectedRowKeys?: string[] | number[];
  /** 自定义选择项，配置项，具体项见下表，设为 true 时使用默认选择项 */
  selections?: SelectionItemProps[] | boolean;
  /** 多选/单选 */
  type?: "checkbox" | "radio";
  /** 选中项发生变化时的回调 */
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  /** 用户手动选择/取消选择某行的回调 */
  onSelect?: (
    record: RecordType,
    selected: boolean,
    selectedRows: RecordType[],
    nativeEvent: Event
  ) => void;
  /** 用户手动选择/取消选择所有行的回调 */
  onSelectAll?: (
    selected: boolean,
    selectedRows: RecordType[],
    changeRows: RecordType[]
  ) => void;
  /** 用户手动选择反选的回调 */
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  /** 用户清空选择的回调 */
  onSelectNone?: () => void;
  /** 用户使用键盘 shift 选择多行的回调 */
  onSelectMultiple?: (
    selected: boolean,
    selectedRows: RecordType[],
    changeRows: RecordType[]
  ) => void;
}

export interface TableLocaleProps extends TableLocale {
  /** 空状态 */
  emptyText?: React.ReactNode | (() => React.ReactNode);
  /** 空状态 box 高度 */
  emptyHeight?: number;
  /** 过滤 - 标题 */
  filterTitle?: string;
  /** 过滤 - 确定模块 */
  filterConfirm?: React.ReactNode;
  /** 过滤 - 重置模块 */
  filterReset?: React.ReactNode;
  /** 过滤 - 无筛选项模块 */
  filterEmptyText?: React.ReactNode;
  /** 过滤 - 全选模块 */
  filterCheckall?: React.ReactNode;
  /** 过滤 - 在筛选项中搜索文案 */
  filterSearchPlaceholder?: string;
  /** 选择项 - 全选当页模块 */
  selectAll?: React.ReactNode;
  /** 选择项 - 清空所有模块 */
  selectNone?: React.ReactNode;
  /** 选择项 - 反选当页模块 */
  selectInvert?: React.ReactNode;
  /** 选择项 - 全选所有模块 */
  selectionAll?: React.ReactNode;
  /** 排序标题文案 */
  sortTitle?: string;
  /** 展开行文案 */
  expand?: string;
  /** 关闭行文案 */
  collapse?: string;
  /** 点击降序文案 */
  triggerDesc?: string;
  /** 点击升序文案 */
  triggerAsc?: string;
  /** 取消排序文案 */
  cancelSort?: string;
}

export interface FRCTableProps extends TableProps<RecordType> {
  /** 是否展示外边框和列边框 */
  bordered?: boolean;
  /** 表格列的配置描述，配置项，具体项见下表 */
  columns?: ColumnsTypeProps[];
  /** 覆盖默认的 table 元素 -> 细节参数请查阅 antd 文档 */
  components?: TableComponents<RecordType>;
  /** 数据数组 */
  dataSource?: object[];
  /** 配置展开属性，配置项，具体项见下表 */
  expandable?: ExpandableProps;
  /** 表格尾部 */
  footer?: (currentPageData: readonly RecordType[]) => ReactNode;
  /** 设置表格内各类浮层的渲染节点，如筛选菜单 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 页面是否加载中 */
  loading?: boolean | SpinProps;
  /** 默认文案配置项，具体项见下表。目前包括排序、过滤、空数据文案 */
  locale?: TableLocaleProps;
  /** 分页器，部分可参考配置项，如下表。或 pagination 文档，设为 false 时不展示和进行分页 */
  pagination?: PaginationConfig | false;
  /** 表格行背景色类型 */
  rowBgType?: "default" | "cross";
  /** 表格行的类名 */
  rowClassName?: (record: RecordType, index: number) => string;
  /** 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey?: string | ((record: RecordType) => string);
  /** 表格行是否可选择，配置项，具体项见下表 */
  rowSelection?: RowSelectionProps;
  /** 表格是否可滚动，也可以指定滚动区域的宽、高，配置项 */
  scroll?: {
    x?: number | true | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
  };
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性 */
  showSorterTooltip?: boolean | TooltipProps;
  /** 表格大小（目前仅支持 small） */
  size?: "small" | "middle" | "large" | undefined;
  /** 支持的排序方式，取值为 ascend descend */
  sortDirections?: ("descend" | "ascend" | null)[];
  /** 设置粘性头部和滚动条 */
  sticky?:
    | boolean
    | {
        offsetHeader?: number;
        offsetSummary?: number;
        offsetScroll?: number;
        getContainer?: () => Window | HTMLElement;
      };
  /** 总结栏 */
  summary?: (currentData: readonly RecordType[]) => ReactNode;
  /** 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 */
  tableLayout?: "auto" | "fixed";
  /** 表格标题 */
  title?: (currentData: readonly RecordType[]) => ReactNode;
  /** 分页、排序、筛选变化时触发 */
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: {
      currentDataSource: RecordType[];
      action: "paginate" | "sort" | "filter";
    }
  ) => void;
  /** 设置头部行属性 */
  onHeaderRow?: (
    columns?: RecordType,
    index?: number
  ) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;
  /** 设置行属性 */
  onRow?: (
    record?: RecordType,
    index?: number
  ) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;
}

const EmptyNode = (props: { height: number }) => {
  const { height } = props;
  return (
    <div className="frc-table-empty" style={{ height: height }}>
      "暂无数据"
    </div>
  );
};

export const Table: FC<FRCTableProps> = (props) => {
  const { className, pagination, locale, rowBgType, ...restProps } = props;
  const classes = classNames("frc-table", className, {
    [`frc-row-bg-type-${rowBgType}`]: rowBgType,
  });

  // Pagination pre next icon replace render
  const PaginationRenderPreNext: ItemRender = (page, type, oe: any) => {
    let node: React.ReactNode;
    switch (type) {
      case "prev":
        node = React.cloneElement(oe, undefined, <CaretLeftOutlined />);
        break;
      case "next":
        node = React.cloneElement(oe, undefined, <CaretRightOutlined />);
        break;
      case "jump-prev":
        node = PaginationReplaceIcon(oe, BackwardOutlined);
        break;
      case "jump-next":
        node = PaginationReplaceIcon(oe, ForwardOutlined);
        break;
      default:
        node = oe;
        break;
    }
    if (pagination && typeof pagination.itemRender === "function") {
      return pagination.itemRender(page, type, node);
    }
    return node;
  };

  const options = {
    className: classes,
    pagination:
      typeof pagination === "boolean"
        ? pagination
        : {
            ...pagination,
            itemRender: PaginationRenderPreNext,
          },
    locale: {
      ...locale,
      emptyText:
        locale && locale.emptyText ? (
          locale.emptyText
        ) : (
          <EmptyNode height={locale?.emptyHeight || 200} />
        ),
    },
    ...restProps,
  };

  // main
  return <AntdTable {...options} />;
};

// normal
Table.defaultProps = {
  size: "small",
  rowBgType: "default",
  pagination: {
    position: ["bottomLeft"],
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: false,
    pageSizeOptions: ["10", "20", "50", "100"],
    showLessItems: false,
    showQuickJumper: false,
    showTitle: true,
    total: 0,
  },
};

export default Table;
