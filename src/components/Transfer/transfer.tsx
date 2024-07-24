import React, { forwardRef } from "react";
import classNames from "classnames";
import { Transfer as AntdTransfer } from "antd";
import {
  TransferItem,
  TransferDirection,
  TransferLocale,
  TransferProps,
  TransferListProps,
  TransferOperationProps,
} from "antd/es/transfer";


declare const InputStatuses: ["warning", "error", ""];
declare type InputStatus = typeof InputStatuses[number];
interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}
interface ListStyle {
  direction: TransferDirection;
}
declare type PaginationType = boolean | {
  pageSize?: number;
  simple?: boolean;
  showSizeChanger?: boolean;
  showLessItems?: boolean;
};
interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}
declare type RenderResult = React.ReactElement | RenderResultObject | string | null;
declare type TransferRender<RecordType> = (item: RecordType) => RenderResult;
declare type SelectAllLabel = React.ReactNode | ((info: {
  selectedCount: number;
  totalCount: number;
}) => React.ReactNode);

interface BaseTransferProps {
  /** tabs 类名 */
  className?: string;
  /** 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 */
  dataSource: TransferItem[];
  /** 是否禁用, */
  disabled?: boolean,
  /** 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false */
  filterOption?: (inputValue: string, item: RecordType) => boolean;
  /** 底部渲染函数 */
  footer?: (props: TransferListProps<RecordType>, info?: {
    direction: TransferDirection;
}) => React.ReactNode;
  /** 两个穿梭框的自定义样式 */
  listStyle?: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
  /** 各种语言 */
  locale?: Partial<TransferLocale>,
  /** 展示为单向样式 */
  oneWay?: boolean,
  /** 操作文案集合，顺序从上至下 */
  operations?: string[],
  /** 操作栏的自定义样式 */
  operationStyle?: React.CSSProperties,
  /** 使用分页样式，自定义渲染列表下无效 */
  pagination?: PaginationType,
  /** 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title */
  render?:  TransferRender<RecordType>,
  /** 自定义顶部多选框标题的集合 */
  selectAllLabels?: SelectAllLabel[],
  /** 设置哪些项应该被选中 */
  selectedKeys?: string[],
  /** 是否显示搜索框 */
  showSearch?: boolean,
  /** 是否展示全选勾选框 */
  showSelectAll?: boolean,
  /** 设置校验状态 */
  status?: InputStatus,
  /** 显示在右侧框数据的 key 集合 */
  targetKeys?: string[],
  /** 标题集合，顺序从左至右 */
  titles?: React.ReactNode[],
  /** 选项在两栏之间转移时的回调函数 */
  onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void,
  /** 选项列表滚动时的回调函数 */
  onScroll?: (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => void,
  /** 搜索框内容时改变时的回调函数 */
  onSearch?: (direction: TransferDirection, value: string) => void,
  /** 选中项发生改变时的回调函数 */
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void,
}

export type FRCTransferProps = BaseTransferProps;

export const Transfer = forwardRef<unknown, FRCTransferProps>((props, ref: any) => {
  const { className, ...restProps } = props;
  const classes = classNames("frc-ui-transfer", className, {
  });

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <AntdTransfer ref={ref} {...options} />;
});

// normal
Transfer.defaultProps = {
  dataSource: [],
  disabled: false,
  locale: { itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容', notFoundContent: null },
  oneWay: false,
  operations: ['>', '<'],
  pagination: false,
  selectedKeys: [],
  showSearch: false,
  showSelectAll: true,
  targetKeys: [],
};

export default Transfer;
