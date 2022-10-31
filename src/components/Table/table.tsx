import debounce from "lodash/debounce";
import React, {
  FC,
  ReactNode,
  Key,
  FunctionComponentElement,
  useRef,
  useState,
  useEffect,
} from "react";
import { controlScrollSpeed } from "./../../utils/index";
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
} from "antd/lib/table/interface";

import { RenderedCell, TableComponents } from "rc-table/lib/interface";

import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  BackwardOutlined,
} from "@ant-design/icons";

import { Icon } from "../../index";

export type FilterValue = (React.Key | boolean)[];
export interface SorterResult<RecordType> {
  column?: ColumnProps<RecordType>;
  order?: SortOrder;
  field?: Key | readonly Key[];
  columnKey?: Key;
}

type keyType = string | number | null;
type RecordType = any;
type SortOrder = "descend" | "ascend" | null;
type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

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
interface BaseColumnsTypeProps<RecordType> {
  /** 设置列的对齐方式 */
  align?: "left" | "right" | "center";
  /** 列样式类名 */
  className?: string;
  /** 设置子项 */
  children?: ColumnsTypeProps[];
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
  /** 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互。 */
  filterDropdown?: ReactNode | ((props: FilterDropdownProps) => ReactNode);
  /** 用于控制自定义筛选菜单是否可见 */
  filterDropdownVisible?: boolean;
  /** 标识数据是否经过过滤，筛选图标会高亮 */
  filtered?: boolean;
  /** 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 */
  filteredValue?: (Key | boolean)[] | null;
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
  render?: (
    value: any,
    record: RecordType,
    index: number
  ) => React.ReactNode | RenderedCell<RecordType>;
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
  sortOrder?: "descend" | "ascend" | null | boolean;
  /** 列头显示文字（函数用法 3.10.0 后支持） */
  title?:
    | ReactNode
    | (({
        sortOrder,
        sortColumn,
        filters,
      }: {
        sortOrder: SortOrder;
        sortColumn: object;
        filters: ColumnFilterItem[];
      }) => ReactNode);
  /** 列宽度（指定了也不生效？看 antd 官方文档） */
  width?: string | number;
  /** 设置最小的 resize 列宽度，参考 demo 进行配置 */
  minResizeWidth?: string | number;
  /** 设置单元格属性 */
  onCell?: (record?: RecordType, rowIndex?: number) => any;
  /** 本地模式下，确定筛选的运行函数 */
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
  /** 自定义筛选菜单可见变化时调用 */
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  /** 设置头部单元格属性 */
  onHeaderCell?: (column: object) => any;
}

export type ColumnsTypeProps = BaseColumnsTypeProps<RecordType> &
  Omit<ColumnProps<RecordType>, "sortOrder" | "children">;

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
  selectedRowKeys?: Key[];
  /** 默认选中项的 key 数组 */
  defaultSelectedRowKeys?: string[] | number[];
  /** 自定义选择项，配置项，具体项见下表，设为 true 时使用默认选择项 */
  selections?: SelectionItemProps[] | boolean;
  /** 多选/单选 */
  type?: "checkbox" | "radio";
  /** 选中项发生变化时的回调 */
  onChange?: (selectedRowKeys?: Key[], selectedRows?: RecordType[]) => void;
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

export interface FRCTableProps extends Omit<TableProps<RecordType>, "columns"> {
  /** 测试 api */
  test?: boolean;
  /** 表格高度 */
  height?: number | string;
  /** 是否展示外边框和列边框 */
  bordered?: boolean;
  /** 固定列外边框激活样式（bordered = true 时起效） */
  borderedActiveFixed?: "normal" | "bold";
  /** 表格列的配置描述，配置项，具体项见下表 */
  columns: ColumnsTypeProps[];
  /** 覆盖默认的 table 元素 -> 细节参数请查阅 antd 文档 */
  components?: TableComponents<RecordType>;
  /** 数据数组 */
  dataSource: object[];
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
  /** 表格行背景色类型 */
  rowBgType?: "default" | "cross";
  /** 开启 表格首行 背景色渐变动效（dataSource 改变时触发） */
  rowActiveFirstGradient?: boolean;
  /** 激活 row (唯一)，row 需有唯一 key 生效 */
  rowActive?: string | number;
  /** 激活 row 时，固定数据变化。数据变化时，顶部提示 */
  rowActiveFixedData?: boolean;
  /** 激活 row，固定数据变化时，顶部提示内容 */
  rowActiveFixedTip?: string;
  /** 表格行的类名 */
  rowClassName?: (record: RecordType, index: number) => string;
  /** 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey?: string | ((record: RecordType) => string);
  /** 表格行是否可选择，配置项，具体项见下表 */
  rowSelection?: RowSelectionProps;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性 */
  showSorterTooltip?: boolean | TooltipProps;
  /** 表格尺寸 */
  size?: "small" | "middle" | "large" | undefined;
  /** 表格标题尺寸 */
  headerSize?: "small" | "middle" | "large" | undefined;
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
    pagination: PaginationConfig,
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

const EmptyNode = (props: { height: number | string }) => {
  const { height } = props;

  return (
    <div className="frc-table-empty" style={{ height: height }}>
      "暂无数据"
    </div>
  );
};

export const Table: FC<FRCTableProps> = (props) => {
  const {
    test,
    className,
    height,
    size = "small",
    dataSource,
    bordered,
    summary,
    borderedActiveFixed,
    loading,
    locale,
    rowBgType,
    headerSize,
    rowActive,
    rowActiveFirstGradient,
    rowActiveFixedData,
    rowActiveFixedTip,
    rowClassName,
    rowSelection,
    columns,
    scroll,
    children,
    ...restProps
  } = props;

  const ref = useRef<any>(null);

  // active | fixed
  const [emptyHeight, setEmptyHeight] = useState<string | number>(0);
  const [rowActiveInner, setRowActiveInner] = useState<keyType>();
  const [dataIsFixed, setDataIsFixed] = useState<boolean>(false);
  const [fixedData, setFixedData] = useState<ColumnsTypeProps[]>([]);

  // virtual sroll
  let tableWidthInner = 0;
  // let scrollPosition = 0;
  const [initScroll, setInitScroll] = useState<boolean>(false);
  const [rowSize, setRowSize] = useState<any[]>([0, 0]);
  const [hiddenTopStyle, setHiddenTopStyle] = useState(0);
  const [totalHeight, setTotalHeight] = useState<number>(0);
  const [virtualData, setVirtualData] = useState<any[]>([]);
  const [fixedYScroll, setFixedYScroll] = useState<boolean>(false);
  const [showXScroll, setShowXScroll] = useState<boolean>(true);

  const classes = classNames("frc-table", className, {
    [`frc-row-bg-type-${rowBgType}`]: rowBgType,
    [`frc-title-size-${headerSize}`]: headerSize,
    "frc-custom-selections": rowSelection?.selections,
    [`frc-fixed-border-active frc-fixed-border-${borderedActiveFixed}`]:
      bordered && borderedActiveFixed,
  });

  useEffect(() => {
    virtualScrollInit();
  }, []); // 组件加载时，执行 “虚拟滚动” 初始化的必要操作

  useEffect(() => {
    rowActive && setRowActiveInner(rowActive);
  }, [rowActive]); // 设置 active key，用于 active 状态

  useEffect(() => {
    if (rowActiveInner && rowActiveFixedData && !dataIsFixed) {
      setFixedData(dataSource);
      setDataIsFixed(true);
    }
  }, [rowActiveInner, rowActiveFixedData]); // 启动 固定 data 模式后，点击 active row，将 data 固定

  useEffect(() => {
    if (rowActiveInner && rowActiveFixedData && dataIsFixed) {
      showDataUpdateTip();
    }
  }, [dataSource]); // 固定 data 后，当 dataSource 更新时，弹出 “提示框” 提示用户

  useEffect(() => {
    // 添加 y 滚动条 scorll 事件
    const yScrollNode = ref.current.querySelector(".ant-table-body-box");

    onScrollSimulationY();
    yScrollNode && yScrollNode.addEventListener("scroll", onScrollSimulationY); // y轴 添加 滚动事件

    return () => {
      yScrollNode &&
        yScrollNode.removeEventListener("scroll", onScrollSimulationY); // y轴 移除 滚动事件
    };
  }, [dataSource, fixedData]); // review 完后决定是否拆分：1. dataSource change 2. fixedData change

  useEffect(() => {
    if (rowSize.join() !== "0,0") {
      let newData: any[] = [];
      if (!dataIsFixed) {
        newData = [...(dataSource || [])].slice(...rowSize) || [];
      } else {
        newData = [...(fixedData || [])].slice(...rowSize) || [];
      }

      setVirtualData(newData);
    }
  }, [rowSize, dataSource, fixedData]); // 根据 ”截取区间，例:[3,20]“，截取最终展示用的 table data

  useEffect(() => {
    if (ref.current) {
      const innerNode = ref.current?.querySelector(".ant-table-body");
      innerNode.style.height = (totalHeight || innerNode.style.height) + "px";
      innerNode.style.paddingTop = hiddenTopStyle + "px";
    }
  }, [hiddenTopStyle, totalHeight]); // 根据 scroll 滚动，控制整体滚动流畅度 （本质： padding-top 与 totalHeight 的相对值）

  const scrollMove = () => {
    const tableNode = ref.current.querySelector(".ant-table-body-box");

    controlScrollSpeed(tableNode, 4);
    // if (init) {
    //   tableNode.scrollTop = 0;
    // } else {
    //   controlScrollSpeed(tableNode, 24);
    // }
  };

  useEffect(() => {
    scrollMove();
  }, []);

  useEffect(() => {
    console.log("scrollMove", initScroll);
    const tableNode = ref.current.querySelector(".ant-table-body-box");

    if (initScroll) {
      tableNode.scrollTop = 0;

      setTimeout(() => {
        setInitScroll(false);
      }, 100);
    } else {
      tableNode.addEventListener("scroll", scrollMove);
    }

    return () => {
      tableNode.removeEventListener("scroll", scrollMove);
    };
  }, [initScroll]);

  // virtual scroll ------------------------------------------------------------------

  const virtualScrollInit = () => {
    const containerNode = ref.current.querySelector(".ant-table-container");
    const oldTableBody = containerNode.querySelector(".ant-table-body");
    const newTableBody = document.createElement("div");

    // 设置滚动 box 属性
    newTableBody.className = "ant-table-body-box";
    newTableBody.style.overflow = "hidden scroll";
    newTableBody.appendChild(oldTableBody);
    containerNode.appendChild(newTableBody);

    oldTableBody.addEventListener("scroll", onScrollSimulationX);
    // newTableBody.addEventListener("scroll", scrollMove);

    fitHeaderWidth(containerNode); // 适配 header width
    fitSummaryButtom(containerNode); // 适配 summary bottom
    calEmptyHeight(height || 300); // 计算 empty 高度

    onWindowResize(containerNode, newTableBody); // 设定监听事件
    window.addEventListener("resize", () => {
      onWindowResize(containerNode, newTableBody);
    }); // 设定监听事件
  }; // 虚拟滚动初始化

  const fitHeaderWidth = async (boxNode: any) => {
    const headerNode = await boxNode.querySelector(".ant-table-header"); // 获取 table header 高度
    const headerColgroupNode = headerNode.querySelector("colgroup"); // col

    if (headerColgroupNode) {
      const oldWidth = headerColgroupNode.lastChild.style.width;
      headerColgroupNode.lastChild.style.width =
        Number(oldWidth.toString().match(/\d+/i)?.[0]) + 8 + "px";
    }

    // fixed right
    const fixedRightHeader = await headerNode.querySelectorAll(
      ".ant-table-cell-fix-right"
    );

    if (fixedRightHeader.length > 0) {
      fixedRightHeader.forEach((item: any) => {
        if (item.style.right !== "0px") {
          item.style.right =
            Number(item.style.right.toString().match(/\d+/i)?.[0]) + 8 + "px";
        }
      });
    }
  }; // 适配 header width

  const fitSummaryButtom = async (boxNode: any) => {
    const bottomSummary = await boxNode.querySelector(
      ".ant-table-container > .ant-table-summary"
    );

    if (bottomSummary) {
      // col
      const colgroupNode = bottomSummary.querySelector("colgroup");
      const oldLastColWidth = colgroupNode.lastElementChild.style.width;

      colgroupNode.lastElementChild.style.width =
        Number(oldLastColWidth.toString().match(/\d+/i)?.[0]) + 8 + "px";

      // fixed right
      const fixedRightSummary = await bottomSummary.querySelectorAll(
        ".ant-table-cell-fix-right"
      );

      if (fixedRightSummary.length > 0) {
        fixedRightSummary.forEach((item: any) => {
          if (item.style.right !== "0px") {
            item.style.right =
              Number(item.style.right.toString().match(/\d+/i)?.[0]) + 8 + "px";
          }
        });
      }

      boxNode.appendChild(bottomSummary);
    }
  }; // 适配 summary bottom 时的 ui

  const calEmptyHeight = async (tableHeight: string | number) => {
    if (ref.current && tableHeight) {
      const headerNode = await ref.current.querySelector(".ant-table-header");
      const headerHeight = headerNode.clientHeight;

      let emptyHeight: string | number = 0;

      if (typeof tableHeight === "number") {
        emptyHeight = tableHeight - headerHeight;
      } else if (tableHeight.indexOf("calc") !== -1) {
        emptyHeight = `calc(${tableHeight} - ${headerHeight}px - 10px)`;
      } else {
        const heightNumber = Number(tableHeight.toString().match(/\d+/i)?.[0]);
        emptyHeight = heightNumber - headerHeight - 10;
      }

      setEmptyHeight(emptyHeight);
    }

    return tableHeight;
  }; // 计算 empty 高度

  const onWindowResize = async (boxNode: any, bodyNode: any) => {
    const heightNode = await boxNode.querySelector(".ant-table-header");
    const width = boxNode?.clientWidth;

    const bottomSummary = boxNode.querySelector(
      ".ant-table-container > .ant-table-summary"
    );

    // console.log("in", bodyNode);

    if (width) {
      if (width >= tableWidthInner) {
        bodyNode.style.height = `calc(100% - ${
          heightNode.clientHeight + (bottomSummary?.clientHeight || 0)
        }px)`;
        heightNode.style.paddingRight = "8px";
        setShowXScroll(false);
      } else {
        bodyNode.style.height = `calc(100% - ${
          heightNode.clientHeight + (bottomSummary?.clientHeight || 0) + 9
        }px)`;
        heightNode.style.paddingRight = "0px";
        setShowXScroll(true);
      }
    }
  }; // 全局监听 resize

  const onMockScrollX = () => {
    if (ref.current) {
      const tableNode = ref.current; // 最外层容器（y轴滚动条）
      const xScrollNode = tableNode.querySelector(".frc-table-scroll-bar"); // x 轴滚动条 node
      const realXScrollNode = tableNode.querySelector(".ant-table-body"); // x 轴滚动条 node
      if (xScrollNode) {
        realXScrollNode.scrollLeft = xScrollNode?.scrollLeft;
      }
    }
  }; // 假的 x 轴滚动条滚动

  const onScrollSimulationX = () => {
    // console.log("in-x");
    const tableNode = ref.current.querySelector(".ant-table-body-box"); // 最外层容器
    const xScrollNode = ref.current.querySelector(".frc-table-scroll-bar"); // x 轴滚动条 node
    const realXScrollNode = tableNode.querySelector(".ant-table-body"); // x 轴滚动条 node

    if (xScrollNode && !fixedYScroll) {
      xScrollNode.scrollLeft = realXScrollNode?.scrollLeft;
    }
  }; // x 轴滚动

  const onScrollSimulationY = () => {
    // console.log("in-y");
    const tableNode = ref.current.querySelector(".ant-table-body-box"); // 最外层容器
    const realScrollTop = tableNode.scrollTop; // 滚动条距离顶部的高度

    const scrollTop = realScrollTop; // 滚动条距离顶部的高度

    // 计算表格头部所占用的高度
    const headerHeight =
      ref.current.querySelector(".ant-table-header")?.clientHeight;
    // 计算表格内容可视区域高度
    const height = ref.current.clientHeight - headerHeight;

    const rowSizeNow = [0];
    let listTotalHeight = 0;
    let hiddenTopHeight = 0; // 计算顶部隐藏区域的高度
    let currentStep = 0; // 0: 顶部被隐藏阶段；1: 可视区域阶段
    const rowHeight = size === "small" ? 24 : size === "middle" ? 32 : 48; // 每行高度
    const OFFSET_VERTICAL = 24;

    if (!height) {
      return;
    }

    [...((dataIsFixed ? fixedData : dataSource) || [])]?.forEach(
      (item, index) => {
        listTotalHeight += rowHeight;
        if (currentStep === 0) {
          if (listTotalHeight >= scrollTop - OFFSET_VERTICAL) {
            // 偏移量 起始 0 - 120，随后根据 DEFAULT_ROW_HEIGHT 为基点偏移，本例子为 32px
            // 根据 scrollTop 算出可视区域起始行号
            rowSizeNow[0] = index;
            currentStep += 1;
          } else {
            hiddenTopHeight += rowHeight;
          }
        } else if (currentStep === 1) {
          if (listTotalHeight > scrollTop + height + OFFSET_VERTICAL) {
            // 计算出可视区域结束行号
            rowSizeNow[1] = index;
            currentStep += 1;
          }
        }
      }
    );

    if (rowSize.join() !== rowSizeNow.join()) {
      // 可视区域的行号有了变化才重新进行渲染
      setRowSize(rowSizeNow);
      setHiddenTopStyle(hiddenTopHeight);
    }

    if (listTotalHeight !== totalHeight) {
      setTotalHeight(listTotalHeight);
    }
  }; // y 轴滚动

  const showDataUpdateTip = () => {
    const containerNode = ref.current?.querySelector(".ant-table-container");

    if (containerNode.querySelector(".frc-table-fixed-tip")) {
      return;
    }

    const tipNode = document.createElement("div");
    tipNode.className = "frc-table-fixed-tip";
    tipNode.innerHTML = rowActiveFixedTip || "数据已更新";
    tipNode.addEventListener("click", () => {
      setRowActiveInner(null);
      setDataIsFixed(false);
      setFixedData([]);
      containerNode.removeChild(tipNode);
      setInitScroll(true);
    });
    containerNode.appendChild(tipNode);
  }; // 固定数据时 tooltip 显示

  // children | columns --------------------------------------------------

  const renderChildren = (childrenNode: ReactNode) => {
    const childlength = React.Children.count(childrenNode);

    return React.Children.map(childrenNode, (child, index): ReactNode => {
      const childElement = child as FunctionComponentElement<ColumnsTypeProps>;
      let childrenProps: any = {};
      const { className, children, title } = childElement.props;

      if (!title) {
        return React.cloneElement(childElement);
      }

      if (childElement.props) {
        const width = Number(
          (childElement.props.width || 0).toString().match(/\d+/i)?.[0]
        );
        tableWidthInner += width;
      }

      if (children) {
        childrenProps = {
          ...childrenProps,
          className: `${className || ""} frc-col-has-child`,
        };
      }

      if (index === childlength - 1) {
        childrenProps = {
          ...childrenProps,
          className: `${childrenProps?.className || ""} frc-table-cell-last`,
        };

        if (children) {
          childrenProps = {
            ...childrenProps,
            children: renderChildren(children),
          };
        }
      }

      return React.cloneElement(childElement, { ...childrenProps });
    });
  };

  const renderColumns = (columns: ColumnsTypeProps[]) => {
    const columnsLength = columns.length;

    const newColumns = columns.map((column, index) => {
      if (!column.title) {
        return column;
      }

      if (column.width) {
        const width = Number(column.width.toString().match(/\d+/i)?.[0]);
        tableWidthInner += width;
      }

      let columnProps: any = {};
      const { children, className } = column;

      if (children) {
        columnProps = {
          ...columnProps,
          className: `${className || ""} frc-col-has-child`,
        };
      }

      if (index === columnsLength - 1) {
        columnProps = {
          ...columnProps,
          className: `${columnProps?.className || ""} frc-table-cell-last`,
        };

        if (children) {
          columnProps = {
            ...columnProps,
            children: renderColumns(children),
          };
        }
      }

      return { ...column, ...columnProps };
    });

    return newColumns;
  };

  const options = {
    className: classes,
    size,
    bordered,
    dataSource: [...virtualData],
    loading: loading
      ? typeof loading === "boolean"
        ? {
            size: "large",
            tip: "加载中...",
            indicator: (
              <Icon
                className="icon-spin frc-table-loading"
                type="loading--quarters"
              />
            ),
          }
        : loading
      : false,
    pagination: false,
    locale: {
      ...locale,
      emptyText:
        locale && locale.emptyText ? (
          locale.emptyText
        ) : (
          <EmptyNode height={emptyHeight} />
        ),
    },
    rowClassName: (record: RecordType, index: number) => {
      let rowClasses = "";
      // 开启首行渐变
      if (rowActiveFirstGradient && index === 0) {
        rowClasses += " frc-table-row-first-gradient";
      }
      // active row className
      if (rowActiveInner && record?.key && rowActiveInner === record.key) {
        rowClasses += " frc-table-row-active";
      }
      // default row className
      if (rowClassName && typeof rowClassName === "function") {
        rowClasses += rowClassName(record, index);
      }
      return rowClasses;
    },
    rowSelection,
    columns: columns ? renderColumns(columns) : columns,
    children: children ? renderChildren(children) : children,
    scroll: { x: "infinite", y: "infinite" },
    summary,
    ...restProps,
  } as TableProps<RecordType>;

  // main
  return (
    <div
      ref={ref}
      className={`frc-table-container${bordered ? " frc-table-borderd" : ""}`}
      style={{ height: height }}
    >
      <AntdTable {...options} />
      {showXScroll && (
        <div
          className="frc-table-scroll-bar"
          onMouseDown={() => setFixedYScroll(true)}
          onMouseUp={() => setFixedYScroll(false)}
          onScrollCapture={onMockScrollX}
        >
          <div
            className="frc-table-scroll-bar-inner"
            style={{ width: tableWidthInner }}
          ></div>
        </div>
      )}
    </div>
  );
};

// normal
Table.defaultProps = {
  size: "small",
  height: 300,
  rowBgType: "default",
};

export default Table;
