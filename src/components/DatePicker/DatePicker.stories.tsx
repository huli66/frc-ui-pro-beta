// Button.stories.ts|tsx

import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { DatePicker as TestDate } from 'antd'

import { ComponentMeta } from '@storybook/react';

import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { FiSlack } from 'react-icons/fi'

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import DatePicker from './index';

const RangePicker = DatePicker.RangePicker

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { DatePicker } from 'frc-ui-pro';
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

// DataPicker 与 RangePicker 通用属性
const BASE_PROPERTIES_COLUMNS = [
    'allowClear',
    'autoFocus',
    'className',
    'dateRender',
    'disabled',
    'disabledDate',
    'dropdownClassName',
    'getPopupContainer',
    'inputReadOnly',
    'locale',
    'mode',
    'nextIcon',
    'open',
    'panelRender',
    'picker',
    'placeholder',
    'popupStyle',
    'prevIcon',
    'style',
    'suffixIcon',
    'superNextIcon',
    'superPrevIcon',
    'onOpenChange',
    'onPanelChange',
    'prefixIcon',
]

// DatePicker 组件属性
const DATE_PICKER_PROPERTIES_COLUMNS = [
    'defaultPickerValue',
    'defaultValue',
    'disabledTime',
    'format',
    'renderExtraFooter',
    'showNow',
    'showTime',
    'showToday',
    'value',
    'onChange',
    'onOk',
    'onPanelChange'
]

// RangePicker 组件属性
const RANGE_PICKER_PROPERTIES_COLUMNS = [
    'allowEmpty',
    'dateRender',
    'defaultPickerValue',
    'defaultValue',
    'disabled',
    'disabledTime',
    'format',
    'ranges',
    'renderExtraFooter',
    'separator',
    'showTime',
    'value',
    'onCalendarChange',
    'onChange'
]

// 通用方法
const COMMON_METHODS_COLUMNS = [
    'blur',
    'focus',
]

// ----------------------------------------------------------------

export default {
    title: '数据录入/DatePicker 日期选择器',
    component: DatePicker,
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

                    <Subheading>共同的 API</Subheading>
                    <Description>以下 API 为 DatePicker、 RangePicker 共享的 API。</Description>
                    <ArgsTable
                        of={DatePicker}
                        include={BASE_PROPERTIES_COLUMNS}
                    />

                    <Subheading>方法</Subheading>
                    <Subheading>共同的方法</Subheading>
                    <ArgsTable of={DatePicker} include={COMMON_METHODS_COLUMNS} />

                    <Subheading>DatePicker</Subheading>
                    <ArgsTable of={DatePicker} include={DATE_PICKER_PROPERTIES_COLUMNS} />

                    <Subheading>RangePicker</Subheading>
                    <ArgsTable of={RangePicker} include={RANGE_PICKER_PROPERTIES_COLUMNS} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof DatePicker>;

// ----------------------------------------------------------------

export const Default = (args: any) => <DatePicker {...args} />;
Default.storyName = '默认 dataPicker';

// ----------------------------------------------------------------

const dateFormat = 'YYYY/MM/DD'

export const BaseComponent = () => {

    const onChange = (date?: moment.Moment | null, dateString?: string) => {
        console.log(date, dateString);
    }

    return (
        <>
            <DatePicker onChange={onChange} />
            <DatePicker
                onChange={onChange}
                suffixIcon={<FiSlack />}
            />
            <DatePicker
                onChange={onChange}
                defaultValue={moment('2015/01/01', dateFormat)}
                locale={locale}
            />
            <DatePicker
                onChange={onChange}
                disabled
                suffixIcon={<FiSlack />}
            />
            <DatePicker
                onChange={onChange}
                defaultValue={moment('2015/01/01', dateFormat)}
                disabled
                suffixIcon={<FiSlack />}
            />
        </>
    )
}

BaseComponent.storyName = '基本用法 datePicker';

// ----------------------------------------------------------------

export const RangePickerComponent = () => {

    const { RangePicker } = DatePicker;

    return (
        <>
            <RangePicker />
            <RangePicker showTime />
            <RangePicker picker="week" />
            <RangePicker picker="month" />
            <RangePicker picker="year" />
        </>
    )
}

RangePickerComponent.storyName = '范围选择器 rangePicker';

// ----------------------------------------------------------------

export const ShowTimeComponent = () => {

    const { RangePicker } = DatePicker;

    function onChange(value: any, dateString: any) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value?: any) {
        console.log('onOk: ');
    }

    return (
        <>
            增加选择时间功能，当 showTime 为一个对象时，其属性会传递给内建的 TimePicker。
            <br />
            <DatePicker showTime onChange={onChange} onOk={onOk} />
            <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
            />
        </>
    )
}

ShowTimeComponent.storyName = '日期时间选择 showTime';

// ----------------------------------------------------------------

export const FormatComponent = () => {

    const { RangePicker } = DatePicker;

    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const customFormat = (value?: any) => `custom format: ${value.format(dateFormat)}`;

    const customWeekStartEndFormat = (value?: any) =>
        `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
            .endOf('week')
            .format(weekFormat)}`;

    return (
        <>
            使用 format 属性，可以自定义日期显示格式。
            <br />
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
            <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
            <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" />
            <RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
            />
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={customFormat} />
        </>
    )
}

FormatComponent.storyName = '日期格式 format';

// ----------------------------------------------------------------

export const PresetRangesComponent = () => {

    const { RangePicker } = DatePicker;

    function onChange(dates?: any, dateStrings?: any) {
        if (dates && dateStrings) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        }
    }

    return (
        <>
            可以预设常用的日期范围以提高用户体验。
            <br />
            <RangePicker
                ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChange}
            />
            <RangePicker
                ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={onChange}
            />
        </>
    )
}

PresetRangesComponent.storyName = '预设范围 ranges';

// ----------------------------------------------------------------

export const disabledTimeComponent = () => {

    const { RangePicker } = DatePicker;

    function range(start: number, end: number) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDate(current: moment.Moment) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    function disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    function disabledRangeTime(_: any, type: string) {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    return (
        <>
            可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间。
            其中 disabledTime 需要和 showTime 一起使用。
            <br />
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
            <DatePicker picker="month" disabledDate={disabledDate} />
            <RangePicker disabledDate={disabledDate} />
            <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
            />
        </>
    )
}

disabledTimeComponent.storyName = '不可选择日期和时间';