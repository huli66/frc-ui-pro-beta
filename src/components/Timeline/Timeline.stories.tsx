import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ComponentMeta } from "@storybook/react";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
  Source
} from "@storybook/addon-docs";

import Timeline, {FRCTimelineProps} from "./index";
import { Radio, Button } from "../..";
import { isEqual, cloneDeep } from "lodash";
const {Item} = Timeline;
// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Timeline } from 'frc-ui-pro';

const { Item } = Timeline;
~~~
`;

  return (
    <>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
};

// ----------------------------------------------------------------

export default {
  title: "数据显示/Timeline 时间轴",
  component: Timeline,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>垂直展示的时间流信息。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>Timeline</Subheading>
          <ArgsTable of={Timeline} />

          <Subheading>Timeline.Item</Subheading>
          <ArgsTable of={Item} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Timeline>;

// ----------------------------------------------------------------

export const Default = (args: FRCTimelineProps) => {
  return (
    <div style={{padding: 16}}>
        <Timeline {...args} pending={<>加载中</>}>
            <Item major>重要时间轴点1</Item>
            <Item>基本时间轴点1</Item>
            <Item major>重要时间轴点2</Item>
            <Item>基本时间轴点2</Item>
        </Timeline>
    </div>
  )
};

Default.storyName = "默认 Timeline";

// ----------------------------------------------------------------

export const _ASizeComponent = () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('small');

    const onChange = (e: any) => {
        setSize(e.target.value);
    };
    
    return (
      <div style={{padding: 16}}>
        <Radio.Group onChange={onChange} value={size} style={{marginBottom: 16}}>
            <Radio value="small">small</Radio>
            <Radio value="medium">medium</Radio>
            <Radio value="large">large</Radio>
        </Radio.Group>
        <Timeline size={size} mode={'left'}>
            <Item label='2022-12-15'>基本时间轴点1</Item>
            <Item label='2022-12-14'>基本时间轴点2</Item>
            <Item label='2022-12-13'>基本时间轴点3</Item>
        </Timeline>
        <div style={{textAlign: 'center', color: "pink"}}>label不跟随size变化!!!!!!</div>
      </div>
    )
  };
  
  _ASizeComponent.storyName = "消息字号 size";
  _ASizeComponent.parameters = {
    controls: { hideNoControlsWarning: true },
  };
  
  // ----------------------------------------------------------------

  export const _ATagComponent = () => {
    const [mode, setMode] = useState<'left' | 'alternate' | 'right'>('left');

    const onChange = (e: any) => {
      setMode(e.target.value);
    };

    return (
      <div style={{padding: 16}}>
        <Radio.Group onChange={onChange} value={mode}>
            <Radio value="left">Left</Radio>
            <Radio value="right">Right</Radio>
            <Radio value="alternate">Alternate</Radio>
        </Radio.Group>
          <Timeline mode={mode}>
              <Item label='2022-12-15'>基本时间轴点1</Item>
              <Item label='2022-12-14'>基本时间轴点2</Item>
              <Item label='2022-12-13'>基本时间轴点3</Item>
          </Timeline>
        <div style={{textAlign: 'center', color: "pink"}}>label推荐与mode一同使用</div>
      </div>
    )
  };
  
  _ATagComponent.storyName = "标签 label";
  _ATagComponent.parameters = {
    controls: { hideNoControlsWarning: true },
  };
  
  // ----------------------------------------------------------------

  export const _AKeyFrameComponent = () => {
    const baseList: any = [
      {label: '14:39', text: '这是一个描述性的消息。'}, 
      {label: '13:27', text: '这是一个描述性的消息。'}, 
      {label: '12:16', text: '这是一个描述性的消息。'},
    ]

    // 模拟后端数据
    const [axiosList, setAxiosList] = useState(baseList)  
    // 模拟新数据推送
    const handleList = () => {
      const label = new Date().getMinutes() + ':' + new Date().getSeconds()
      setAxiosList([{label, text: '这是一个描述性的消息。'}, ...axiosList])
    }
    
    return (
      <div style={{background: '#172422 ', padding: 16}}>
        <Button onClick={() => handleList()}>点我加一条数据</Button>
        <Timeline mode="left">
            {axiosList.map((e: any) => {
              return <Item label={e.label} key={e.label+ Math.random()}>{e.text}</Item>
            })}
        </Timeline>
      </div>
    )
  };
  
  _AKeyFrameComponent.storyName = "数据刷新动效";
  _AKeyFrameComponent.parameters = {
    controls: { hideNoControlsWarning: true },
  };
  
  // ----------------------------------------------------------------

  // export const _ANewsLetterComponent = () => {
  //   const baseList: any = [
  //     {label: '14:39', text: '这是一个描述性的消息。'}, 
  //     {label: '13:27', text: '这是一个描述性的消息。'}, 
  //     {label: '12:16', text: '这是一个描述性的消息。'},
  //   ]

  //   // 模拟后端数据
  //   const [axiosList, setAxiosList] = useState(baseList)  
  //   // 渲染的数据
  //   const [myList, setMyList] = useState<any>(axiosList || []) 
  //   // 模拟新数据推送
  //   const handleList = () => {
  //     const label = new Date().getMinutes() + ':' + new Date().getSeconds()
  //     setAxiosList([{label, text: '这是一个描述性的消息。'}, ...axiosList])
  //   }

  //   useEffect(() => {
  //     if (axiosList && !isEqual(axiosList, myList)) {
  //       // console.log(document);
        
  //       setMyList(axiosList)
  //     }
  //   }, [axiosList])

  //   // useEffect(() => {
  //   //   console.log('myList', myList);
  //   // }, [myList])
    
  //   return (
  //     <div style={{background: '#172422 ', padding: 16}}>
  //       <Button onClick={() => handleList()}>点我加一条数据</Button>
  //       <div style={{height: 200, overflow: "hidden auto"}}>
  //         <Timeline mode="left">
  //           {myList.map((e: any) => {
  //             return <Item label={e.label} key={e.label + Math.random()} showAction={e?.showAction}>{e.text}</Item>
  //           })}
  //         </Timeline>
  //       </div>
  //       <div style={{textAlign: 'center', color: "pink"}}>Timerline类似标签,不方便在内部处理数据,此demo暴露出一个  参数来加载动画,需要前端进行处理</div>
  //     </div>
  //   )
  // };
  
  // _ANewsLetterComponent.storyName = "新数据提醒";
  // _ANewsLetterComponent.parameters = {
  //   controls: { hideNoControlsWarning: true },
  // };
  
  // ----------------------------------------------------------------

  // export const _AKeyFrameComponent = () => {
  //   const baseList: any = [
  //     {label: '14:39', text: '这是一个描述性的消息。'}, 
  //     {label: '13:27', text: '这是一个描述性的消息。'}, 
  //     {label: '12:16', text: '这是一个描述性的消息。'},
  //   ]

  //   // 模拟后端数据
  //   const [axiosList, setAxiosList] = useState(baseList)  
  //   // 模拟新数据推送
  //   const handleList = () => {
  //     const label = new Date().getMinutes() + ':' + new Date().getSeconds()
  //     setAxiosList([{label, text: '这是一个描述性的消息。'}, ...axiosList])
  //   }
    
  //   return (
  //     <div style={{background: '#172422 ', padding: 16}}>
  //       <Button onClick={() => handleList()}>点我加一条数据</Button>
  //       <Timeline mode="left">
  //           {axiosList.map((e: any) => {
  //             return <Item label={e.label} key={e.label+ Math.random()}>{e.text}</Item>
  //           })}
  //       </Timeline>
  //     </div>
  //   )
  // };
  
  // _AKeyFrameComponent.storyName = "test";
  // _AKeyFrameComponent.parameters = {
  //   controls: { hideNoControlsWarning: true },
  // };