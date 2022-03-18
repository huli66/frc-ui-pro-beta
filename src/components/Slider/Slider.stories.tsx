import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import {Switch, Row, Col, InputNumber} from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import Slider from './index';
import {FRCSliderProps} from './slider'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Slider } from 'frc-ui-pro';
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
    title: '数据录入/Slider 滑动输入条',
    component: Slider,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>滑动型输入器，展示当前值和可选范围。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Slider</Subheading>
                    <ArgsTable of={Slider} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Slider>;

// ----------------------------------------------------------------

export const Default = (args: FRCSliderProps) => {
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const handleDisabledChange = (disabled: boolean) => {
        setDisabled(disabled);
    }
    return (
        <>
            <Slider defaultValue={30} disabled={disabled} />
            <Slider range defaultValue={[20, 50]} disabled={disabled} />
            Disabled: <Switch size="small" checked={disabled} onChange={handleDisabledChange} />
        </>
    )
};

Default.storyName = '默认 slider';

// -----------------------------------------------------------------

export const SizeComponent = () => {
    return (
        <>
            <Slider defaultValue={30} />
            <Slider defaultValue={30} size='large' />
            <Slider defaultValue={30} size='small' />
            <Slider range defaultValue={[20, 50]} />
        </>
    )
}
SizeComponent.storyName = '大小 slider';

// -----------------------------------------------------------------

export const StepComponent = () => {
    const [integerValue, setIntegerValue] = React.useState<number>(1);
    const handleIntegerChange = (value: number) => {
        setIntegerValue(value);
    }
    const [decimalValue, setDecimalValue] = React.useState<number>(0);
    const handleDecimalChange = (value: number) => {
        if (isNaN(value)) {
            return;
        }
        setDecimalValue(value);
    }
    const IntegerStep = () => {
        return (
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={20}
                  onChange={handleIntegerChange}
                  value={typeof integerValue === 'number' ? integerValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: '0 16px' }}
                  value={integerValue}
                  onChange={handleIntegerChange}
                />
              </Col>
            </Row>
          );
    }
    const DecimalStep = () => {
        return (
            <Row>
              <Col span={12}>
                <Slider
                  min={0}
                  max={1}
                  onChange={handleDecimalChange}
                  value={typeof decimalValue === 'number' ? decimalValue : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={1}
                  style={{ margin: '0 16px' }}
                  step={0.01}
                  value={decimalValue}
                  onChange={handleDecimalChange}
                />
              </Col>
            </Row>
        );
    }
    return (
        <>
            <IntegerStep />
            <DecimalStep />
        </>
    )
};

StepComponent.storyName = '带输入框的滑块 slider';

// -----------------------------------------------------------------

export const TipSliderComponent = () => {
    const formatter = (val) => {
        return `${val}%`;
    }
    return (
        <>
            <Slider tipFormatter={formatter} />
            <Slider tipFormatter={null} />
        </>
    ) 
}

TipSliderComponent.storyName = '自定义提示 slider';

// -----------------------------------------------------------------

export const EventSliderComponent = () => {
    const onChange = (value) => {
        console.log('onChange: ', value);
      }
    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    }
    return (
        <>
            <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />
            <Slider
            range
            step={10}
            defaultValue={[20, 50]}
            onChange={onChange}
            onAfterChange={onAfterChange}
            />
        </>
    )
}

EventSliderComponent.storyName = '事件 slider';

// -----------------------------------------------------------------

export const VerticalSliderComponent = () => {
    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
      };
      
    const marks = {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
    };
    return (
        <>
            <div style={style}>
            <Slider vertical defaultValue={30} />
            </div>
            <div style={style}>
            <Slider vertical range step={10} defaultValue={[20, 50]} />
            </div>
            <div style={style}>
            <Slider vertical range marks={marks} defaultValue={[26, 37]} />
            </div>
        </>
    )      
}

VerticalSliderComponent.storyName = '垂直方向的 slider';

// -----------------------------------------------------------------

export const MarksSliderComponent = () => {
    const marks = {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
    };
    return (
        <>
            <h4>included=true</h4>
            <Slider marks={marks} defaultValue={37} />
            <Slider range marks={marks} defaultValue={[26, 37]} />

            <h4>included=false</h4>
            <Slider marks={marks} included={false} defaultValue={37} />

            <h4>marks & step</h4>
            <Slider marks={marks} step={10} defaultValue={37} />

            <h4>step=null</h4>
            <Slider marks={marks} step={null} defaultValue={37} />
        </>
    )  
}

MarksSliderComponent.storyName = '带标签的滑块 slider';

// -----------------------------------------------------------------

export const ReverseSliderComponent = () => {
    const [reverse, setReverse] = React.useState<boolean>(true);
    const handleReverseChange = (value: boolean) => {
        setReverse(value);
    }
    return (
        <>
            <Slider defaultValue={30} reverse={reverse} />
            <Slider range defaultValue={[20, 50]} reverse={reverse} />
            Reversed: <Switch size="small" checked={reverse} onChange={handleReverseChange} />
        </>
    )
}

ReverseSliderComponent.storyName = '反向 slider';

// -----------------------------------------------------------------

export const TipVisibleComponent = () => <Slider defaultValue={30} tooltipVisible />

TipVisibleComponent.storyName = '控制 ToolTip 的显示';

// -----------------------------------------------------------------

export const DragTrackComponent = () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />

DragTrackComponent.storyName = '范围可拖拽';