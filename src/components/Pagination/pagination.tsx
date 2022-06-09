import React,{ FC,ReactNode } from 'react'
import classNames from 'classnames'
import {Pagination as AntdPagination, PaginationProps} from 'antd'

interface BasePaginationProps {
  /** 当前页数 */
  current?: number
  /** 默认的当前页数 */
  defaultCurrent?: number
  /** 默认的每页条数 */
  defaultPageSize?: number
  /** 禁用分页 */
  disabled?: boolean
  /** 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean
  /** 每页条数 */
  pageSize?: number
  /** 指定每页可以显示多少条 */
  pageSizeOptions?: string[]
  /** 是否显示较少页面内容 */
  showLessItems?: boolean
  /** 是否可以快速跳转至某页 */
  showQuickJumper?: boolean | { goButton: ReactNode }
  /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
  showSizeChanger?: boolean
  /** 用于显示数据总量和当前数据顺序 */
  showTotal?: (total: number, range: [number, number]) => ReactNode
  /** 当添加该属性时，显示为简单分页 */
  simple?: boolean
  /** 数据总数 */
  total?: number
  /** 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 */
  onChange?: (page: number, pageSize: number) => void;
  /** pageSize 变化的回调 */
  onShowSizeChange?: (current: number, size: number) => void;
}

export type FRCPaginationProps = BasePaginationProps & Omit<PaginationProps, 'size'>

export const Pagination: FC<FRCPaginationProps> = (props) => {
  const { className,...restProps } = props

  const classes = classNames('frc-pagination', className)

  const options = {
    className: classes,
    ...restProps
  }

  return (
    <AntdPagination {...options} />
  )
}

Pagination.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  hideOnSinglePage: false,
  pageSizeOptions: ['10','20','50','100'],
  showLessItems: false,
  showQuickJumper: false,
  showTitle: true,
  total: 0
}

export default Pagination
