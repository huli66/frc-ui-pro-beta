import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import moment, {Moment} from 'moment'
import {Badge, BadgeProps, Alert, Row, Col} from 'antd'
import Select from '../Select';
import Radio from '../Radio';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Calendar from './index';
import { FRCCalendarProps, CalendarMode } from './calendar';
// import Button from '../Button';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Calendar } from 'frc-ui-pro';
~~~
`

    return <>
        <ReactMarkdown children={markdown} components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }
        }} /></>
}

// ----------------------------------------------------------------

export default {
  title: '数据展示/Calendar 日历',
  component: Calendar,
  parameters: {
      docs: {
          // docs 页面 => 总体布局
          page: () => (
              <>
                  <Title />
                  <Description>输入或选择日期的控件。</Description>
                  <ImportComponent />
                  <Subtitle>默认 - 组件展示</Subtitle>
                  <Primary />
                  <Stories title="组件总览" includePrimary={true} />

                  <Heading>API</Heading>
                  <Subheading>属性</Subheading>

                  <Subheading>Calendar</Subheading>
                  <ArgsTable of={Calendar} />
              </>
          ),
      },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Calendar>;

// -------------------------------------------------------------------

export const Default = (args: FRCCalendarProps) => <Calendar {...args} />;

Default.storyName = "基本 Calendar";
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};

// -----------------------------------------------------------------

export const _EventCalendarComponent = () => {
  const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge style={{color: '#FFEBC8'}} status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
  );
};
_EventCalendarComponent.storyName = "通知事项日历 Calendar";
_EventCalendarComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// -----------------------------------------------------------------

export const _CardModeCalendarComponent = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div style={{width: 300}}>
      <Calendar fullscreen={false} isCard onPanelChange={onPanelChange} />
    </div>
  )
}
_CardModeCalendarComponent.storyName = "默认卡片模式 Calendar";
_CardModeCalendarComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// -----------------------------------------------------------------

export const _CardCalendarComponent = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div style={{width: 300}}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  )
}
_CardCalendarComponent.storyName = "卡片模式 Calendar";
_CardCalendarComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// -----------------------------------------------------------------

export const _SelectCalendarComponent = () => {
  const [value, setValue] = useState(() => moment('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));

  const onSelect = (newValue: Moment) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Moment) => {
    setValue(newValue);
  };
  return (
    <>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  )
}
_SelectCalendarComponent.storyName = "选择功能 Calendar";
_SelectCalendarComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// -----------------------------------------------------------------

export const _CustomHeaderCalendarComponent = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div style={{width: 300}}>
      <Calendar
        fullscreen={false}
        // disabledDate={(currentDate: Moment) => currentDate && currentDate < moment().endOf('day')}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    buttonStyle="solid"
                    onChange={(e: any) => {
                      onTypeChange(e.target.value)
                    }}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    style={{minWidth: 70}}
                    value={year}
                    onChange={newYear => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    style={{minWidth: 70}}
                    value={month}
                    onChange={newMonth => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  )
}
_CustomHeaderCalendarComponent.storyName = "自定义头部 Calendar";
_CustomHeaderCalendarComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};