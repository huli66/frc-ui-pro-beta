import React, {forwardRef} from 'react';
import classNames from 'classnames'
import { Calendar as AntdCalendar, CalendarProps } from 'antd';
import {BackwardOutlined, CaretLeftOutlined, CaretRightOutlined, ForwardOutlined} from '@ant-design/icons';
import { Moment } from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN'

export type DateType = Moment;
export type CalendarMode = 'year' | 'month';
export type HeaderConfig<DateType> = {
  value: DateType;
  type: CalendarMode;
  onChange: (date: DateType) => void;
  onTypeChange: (type: CalendarMode) => void;
}
export type HeaderRender = (config: HeaderConfig<DateType>) => React.ReactNode;
interface BaseCalendarProps extends CalendarProps<DateType> {
  /** 设置可以显示的日期 */
  validRange?: [DateType, DateType];
  /** 不可选择的日期，参数为当前 value，注意使用时不要直接修改 */
  disabledDate?: (date: DateType) => boolean;
  /** 自定义渲染日期单元格，返回内容覆盖单元格 */
  dateFullCellRender?: (date: DateType) => React.ReactNode;
  /** 自定义渲染日期单元格，返回内容会被追加到单元格 */
  dateCellRender?: (date: DateType) => React.ReactNode;
  /** 自定义渲染月单元格，返回内容覆盖单元格 */
  monthFullCellRender?: (date: DateType) => React.ReactNode;
  /** 自定义渲染月单元格，返回内容会被追加到单元格 */
  monthCellRender?: (date: DateType) => React.ReactNode;
  /** 自定义头部内容 */
  headerRender?: HeaderRender;
  /** 卡片模式 */
  isCard?: boolean;
  /** 展示日期 */
  value?: DateType;
  /** 默认展示的日期 */
  defaultValue?: DateType;
  /** 初始模式 */
  mode?: CalendarMode;
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 日期变化回调 */
  onChange?: (date: DateType) => void;
  /** 日期面板变化回调 */
  onPanelChange?: (date: DateType, mode: CalendarMode) => void;
  /** 点击选择日期回调 */
  onSelect?: (date: DateType) => void;
}
export type FRCCalendarProps = BaseCalendarProps;

export const Calendar = forwardRef<unknown, FRCCalendarProps>((props, ref: any) => {
  const {
    className,
    isCard,
    fullscreen,
    headerRender,
    ...restProps
  } = props

  const frcHeaderRender = (config: HeaderConfig<DateType>) => {
    const {value, onChange} = config;
    const year = value.year();
    const month = value.month();
    return (
      <div className='card-calendar-header'>
        <span className='card-calendar-header-btns'>
          <BackwardOutlined
            onClick={() => {
              const prev = year - 1;
              const now = value.clone().year(prev);
              onChange(now);
            }}
          />
          <CaretLeftOutlined
            onClick={() => {
              const prev = month - 1;
              const now = value.clone().month(prev);
              onChange(now);
            }}
          />
        </span>
        <span>{year}</span>
        <span>
          {month + 1}
          <span>月</span>
        </span>
        <span className='card-calendar-header-btns'>
          <CaretRightOutlined
            onClick={() => {
              const next = month + 1;
              const now = value.clone().month(next);
              onChange(now);
            }}
          />
          <ForwardOutlined
            onClick={() => {
              const next = year + 1;
              const now = value.clone().year(next);
              onChange(now);
            }}
          />
        </span>
      </div>
    );
  }
  const classes = classNames("frc-picker-calendar", className, {
    [`frc-picker-calendar-card`]: isCard,
  });

  const options = {
    className: classes,
    fullscreen: isCard ? false : fullscreen,
    headerRender: isCard ? frcHeaderRender : headerRender,
    ...restProps,
  };
  // main
  return <AntdCalendar {...options} />;
});

// normal
Calendar.defaultProps = {
  locale: locale,
};

export default Calendar;