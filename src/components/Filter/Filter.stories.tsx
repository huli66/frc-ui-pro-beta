import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Source,
} from "@storybook/addon-docs";

import Filter, { FRCFilterProps, OptionType } from "./index";
import Button from "../Button";

const ImportComponent = () => {
  const markdown = `
~~~js
import { Filter } from 'frc-ui-pro';
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

export default {
  title: "数据显示/Filter 筛选按钮",
  component: Filter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>筛选按钮，多用于高级筛选</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <ArgsTable of={Filter} />
          <Source
            dark
            language="ts"
            code="interface OptionType {
                        label: React.ReactNode;
                        value: string | number;
                        disabled?: boolean;
                      };"
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Filter>;

export const Default = (args: FRCFilterProps) => {
  const { onChange, ...otherArgs } = args;
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];
  return <Filter {...otherArgs} options={options} />;
};

Default.storyName = "默认 filter";

// ------------------------------------------------------

export const _BaseComponent = () => {
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];

  return (
    <>
      multiple参数控制多选模式
      <br />
      <br />
      默认单选
      <Filter options={options} defaultValue={["ALL"]} />
      <br />
      多选
      <Filter options={options} multiple defaultValue={["ALL"]} />
    </>
  );
};

_BaseComponent.storyName = "多选模式 filter";

// ------------------------------------------------------

export const _ControlledComponent = () => {
  const [multiple, setMultiple] = React.useState<Array<string | number>>([
    "1",
    "3",
  ]);
  const [radio, setRadio] = React.useState<Array<string | number>>(["1"]);

  const options: OptionType[] = [
    {
      label: "filter001",
      value: "1",
    },
    {
      label: "filter002",
      value: "2",
    },
    {
      label: "filter003",
      value: "3",
    },
    {
      label: "filter004",
      value: "4",
    },
    {
      label: "filter005",
      value: "5",
    },
  ];

  const handleMulChange = (
    val: Array<string | number>,
    allVal?: Array<string | number>
  ) => {
    setMultiple(val);
    console.log("mutiple mode", val, allVal);
  };
  const handleChange = (
    val: Array<string | number>,
    allVal?: Array<string | number>
  ) => {
    setRadio(val);
    console.log("radio mode", val, allVal);
  };

  return (
    <>
      <Filter
        options={options}
        multiple
        value={multiple}
        onChange={handleMulChange}
      />
      <br />
      <Filter options={options} value={radio} onChange={handleChange} />
    </>
  );
};

_ControlledComponent.storyName = "受控 filter";

// ------------------------------------------------------

export const _DisableComponent = () => {
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
      disabled: true,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
      disabled: true,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];

  return <Filter options={options} multiple defaultValue={[1]} />;
};

_DisableComponent.storyName = "禁用某一项";

// ------------------------------------------------------

export const _ShowAllComponent = () => {
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];

  return (
    <>
      showAll参数控制展示全选按钮
      <br />
      <br />
      <Filter options={options} multiple defaultValue={["ALL"]} />
      <br />
      <Filter options={options} showAll={false} defaultValue={[1]} multiple />
    </>
  );
};

_ShowAllComponent.storyName = "全选按钮";

// ------------------------------------------------------

export const _ShowAllJumpAutomaticallyComponent = () => {
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];

  const allVals = options.map(({ value }) => value);

  return (
    <>
      多选模式下且展示全选按钮时，autoSelectAll参数控制是否自动跳转全选按钮
      <br />
      以下三个组件的defaultValue参数值 集合元素相同
      <br />
      autoSelectAll为true时会默认选中且只选中全选按钮
      <br />
      <br />
      <Filter options={options} multiple defaultValue={allVals} />
      <br />
      <Filter
        options={options}
        autoSelectAll={false}
        defaultValue={allVals}
        multiple
      />
      <br />
      <Filter
        options={options}
        showAll={false}
        defaultValue={allVals}
        multiple
      />
    </>
  );
};

_ShowAllJumpAutomaticallyComponent.storyName = "是否自动跳转全选按钮";

// ------------------------------------------------------
// ------------------------------------------------------

export const _ShowAllOnlyComponent = () => {
  const options: OptionType[] = [
    {
      label: "filter1",
      value: 1,
    },
    {
      label: "filter2",
      value: 2,
    },
    {
      label: "filter3",
      value: 3,
    },
    {
      label: "filter4",
      value: 4,
    },
    {
      label: "filter5",
      value: 5,
    },
  ];

  const [val, setVal] = useState(["ALL"]);

  return (
    <>
      仅展示全选按钮 <br />
      设置showAllOnly <br />
      value设置为[]时全选按钮取消选中
      <br />
      <Button
        onClick={() => {
          setVal([]);
        }}
      >
        取消全选
      </Button>
      <Filter
        value={val}
        onChange={(v) => {
          setVal(v as any);
        }}
        allText="show all"
        showAllOnly
      />
    </>
  );
};

_ShowAllOnlyComponent.storyName = "仅展示show All";
