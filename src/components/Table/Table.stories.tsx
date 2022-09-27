/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { ComponentMeta } from "@storybook/react";
import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
  Source,
} from "@storybook/addon-docs";
import "./_story.scss";
import Table from "./index";
import { ImportCode } from "../../utils/importComponent";

import {
  ColumnShowArgsTable,
  ExpandableShowArgsTable,
  PaginationShowArgsTable,
  RowSelectionShowArgsTable,
  SelectionItemShowArgsTable,
  TableLocaleShowArgsTable,
} from "./extendArgsTable";

import Highlighter from "react-highlight-words";
import qs from "qs";
import {
  // component
  Select,
  Button,
  Input,
  Icon,
  Switch,
  InputNumber,
  Tooltip,
  Checkbox,
  // type
  FRCTableProps,
  ColumnsTypeProps,
  InputRef,
  FilterValue,
  SorterResult,
  PaginationConfig,
  RowSelectionProps,
} from "../../index";

// edit
import { Form, Table as AntdTable } from "antd";
import type { FormInstance } from "antd/es/form";

// drag sort
import update from "immutability-helper";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// handle drag sort
import { arrayMoveImmutable } from "array-move";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

// vertical list
import classNames from "classnames";
import ResizeObserver from "rc-resize-observer";
import { VariableSizeGrid as Grid } from "react-window";

// resize
import { Resizable } from "react-resizable";

export default {
  title: "数据显示/Table表格",
  component: Table,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>展示行列数据。</Description>
          <Source
            dark
            language="ts"
            code={`import { Table } from 'frc-ui-pro';`}
          />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>Table</Subheading>
          <ArgsTable of={Table} />

          <Subheading>Column Props</Subheading>
          <Description>
            列描述数据对象，是 columns 中的一项，Column 使用相同的 API。
          </Description>
          <ArgsTable of={ColumnShowArgsTable} />

          <Subheading>Pagination Props</Subheading>
          <Description>分页的配置项。</Description>
          <ArgsTable of={PaginationShowArgsTable} />
          <Description>更多配置项，请查看 Pagination 组件。</Description>

          <Subheading>Expandable Props</Subheading>
          <Description>展开功能的配置。</Description>
          <ArgsTable of={ExpandableShowArgsTable} />

          <Subheading>RowSelection Props</Subheading>
          <Description>选择功能的配置。</Description>
          <ArgsTable of={RowSelectionShowArgsTable} />

          <Subheading>Selection Props</Subheading>
          <ArgsTable of={SelectionItemShowArgsTable} />

          <Subheading>TableLocale Props</Subheading>
          <ArgsTable of={TableLocaleShowArgsTable} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Table>;

// ----------------------------------------------------------------

export const Default = (args: FRCTableProps) => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown1",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green2",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black3",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Black4",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  return (
    <Table
      {...args}
      bordered
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000, y: 200 }}
    />
  );
};

Default.storyName = "默认 table";

// ----------------------------------------------------------------

export const _AA_RowBgComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown1",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green2",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black3",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Black4",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      default
      <Table rowBgType="default" columns={columns} dataSource={data} />
      <br />
      cross
      <Table rowBgType="cross" columns={columns} dataSource={data} />
    </>
  );
};

_AA_RowBgComponent.storyName = "不同行背景 rowBgType";

// ----------------------------------------------------------------

// ----------------------------------------------------------------

export const _AB_BorderComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        bordered
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_AB_BorderComponent.storyName = "边框 border";

export const _AC_NoDataComponent = () => {
  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={[]} locale={{ emptyHeight: 300 }} />
      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={[]}
        locale={{ emptyHeight: 300 }}
      />
    </>
  );
};

_AC_NoDataComponent.storyName = "暂无数据";

// ----------------------------------------------------------------

export const _AD_LoadingComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown1",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green2",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black3",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Black4",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
        loading
      />
    </>
  );
};

_AD_LoadingComponent.storyName = "加载中 loading";

// ----------------------------------------------------------------

export const _AE_SizeComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown1",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green2",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black3",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Black4",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      small{" => "}is default
      <Table size="small" columns={columns} dataSource={data} />
      <Table size="small" columns={columns} dataSource={[]} />
      <Table
        size="small"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <Table size="small" rowBgType="cross" columns={columns} dataSource={[]} />
      <br />
      middle
      <Table size="middle" columns={columns} dataSource={data} />
      <Table size="middle" columns={columns} dataSource={[]} />
      <Table
        size="middle"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <Table
        size="middle"
        rowBgType="cross"
        columns={columns}
        dataSource={[]}
      />
      <br />
      large
      <Table size="large" columns={columns} dataSource={data} />
      <Table size="large" columns={columns} dataSource={[]} />
      <Table
        size="large"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <Table size="large" rowBgType="cross" columns={columns} dataSource={[]} />
    </>
  );
};

_AE_SizeComponent.storyName = "不同尺寸 size";

// ----------------------------------------------------------------

export const _AF_HeaderSizeComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown1",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green2",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black3",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Black4",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      small{" => "}is default
      <Table headerSize="small" columns={columns} dataSource={data} />
      <Table
        headerSize="small"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <br />
      middle
      <Table headerSize="middle" columns={columns} dataSource={data} />
      <Table
        headerSize="middle"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <br />
      large
      <Table headerSize="large" columns={columns} dataSource={data} />
      <Table
        headerSize="large"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

_AF_HeaderSizeComponent.storyName = "不同尺寸 headerSize";

// ----------------------------------------------------------------

export const _AG_FixledCloumnsComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 900, y: 200 }}
        pagination={false}
      />
      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        scroll={{ x: 900, y: 200 }}
        pagination={false}
      />
      <Table
        size="middle"
        columns={columns}
        dataSource={data}
        scroll={{ x: 900, y: 200 }}
        pagination={false}
      />
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        scroll={{ x: 900, y: 200 }}
        pagination={false}
      />
    </>
  );
};

_AG_FixledCloumnsComponent.storyName = "固定列";

// ----------------------------------------------------------------

export const _AH_SummaryComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 用 summary 实现: 表格的 “总结栏” or “置顶功能”。
    // (tips: “总结栏” 与 “置顶功能”。一个表格中，仅能存在二者其中一个)
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        summary={() => {
          return (
            <Table.Summary fixed="top">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top1</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top2</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top3</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        bordered
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        summary={() => {
          return (
            <Table.Summary fixed="top">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top1</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top2</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top3</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
                <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
                <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_AH_SummaryComponent.storyName = "总结栏/置顶拦";

// ----------------------------------------------------------------

export const _AI_CustomCellTitleComponent = () => {
  interface DataType {
    key: string | number;
    name?: string;
    interval?: string | React.ReactNode;
    address?: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Select
          defaultValue="day"
          type="no-border"
          style={{
            width: "calc(100% + 12px)",
            marginLeft: "-6px",
            marginRight: "-6px",
          }}
          wrapperStyle={{ width: "100%" }}
        >
          <Select.Option value="day">Day </Select.Option>
          <Select.Option value="week">Week </Select.Option>
          <Select.Option value="month">Month </Select.Option>
          <Select.Option value="year">Year </Select.Option>
        </Select>
      ),
      dataIndex: "interval",
      key: "interval",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      interval: "2022-01-01",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "John Brown",
      interval: (
        <Select
          defaultValue="2022-01-01"
          type="no-border"
          style={{
            width: "calc(100% + 10px)",
            marginLeft: "-5px",
            marginRight: "-5px",
          }}
          wrapperStyle={{ width: "100%" }}
        >
          <Select.Option value="2022-01-01">2022-01-01 </Select.Option>
          <Select.Option value="2022-01-02">2022-01-02 </Select.Option>
          <Select.Option value="2022-01-03">2022-01-03 </Select.Option>
          <Select.Option value="2022-01-04">2022-01-04 </Select.Option>
        </Select>
      ),
      address: "New York No. 1 Lake Park",
    },
    {
      key: "3",
      name: "John Brown",
      interval: "2022-01-01",
      address: "New York No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 例：配合 Select 组件，实现表格 “单元格” 的自定义： “头部选择”、“数据选择”
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        locale={{ emptyHeight: 300 }}
      />
      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        locale={{ emptyHeight: 300 }}
      />
    </>
  );
};

_AI_CustomCellTitleComponent.storyName = "自定义单元格";

// ----------------------------------------------------------------

export const _AJ_ActiveComponent = () => {
  const [activeItem, setActiveItem] = useState<string | number | undefined>();
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        // bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: 900, y: 200 }}
        pagination={false}
        rowActive={activeItem}
        onRow={(record) => {
          return {
            onClick: () => {
              setActiveItem(record.key);
            }, // 点击行
          };
        }}
      />
    </>
  );
};

_AJ_ActiveComponent.storyName = "激活选中 row";

// ----------------------------------------------------------------

export const _AK_SelectComponent = () => {
  interface DataType {
    key?: string;
    name?: string;
    age?: number;
    address?: string;
    tags?: string;
    action?: string;
    sex?: "male" | "female";
    phone?: number;
    description?: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "400px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "200px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      fixed: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection: RowSelectionProps = {
    onChange: (selectedRowKeys?: React.Key[], selectedRows?: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, RowSelectionProps } from "frc-ui-pro/components/Table/table";

    // 第一列是联动的选择框。可以通过 rowSelection.type 属性指定选择类型，默认为checkbox。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        size="middle"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        rowBgType="cross"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
      <Table
        rowBgType="cross"
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_AK_SelectComponent.storyName = "可选择";

// ----------------------------------------------------------------

export const _AL_ControlSelectComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  // ----------------------------------------------------------------------

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys?: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    newSelectedRowKeys && setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: RowSelectionProps = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys && selectedRowKeys.length > 0;

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, RowSelectionProps } from "frc-ui-pro/components/Table/table";

    // 选择后进行操作，完成后清空选择，通过 rowSelection.selectedRowKeys 来控制选中项。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <div style={{ marginBottom: 4 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
};

_AL_ControlSelectComponent.storyName = "选择和操作";

// ----------------------------------------------------------------

export const _AM_CustomSelectComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  // ----------------------------------------------------------------------

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys?: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    newSelectedRowKeys && setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: RowSelectionProps = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys: React.Key[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter(
            (_: any, index: number) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys: React.Key[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter(
            (_: any, index: number) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, RowSelectionProps } from "frc-ui-pro/components/Table/table";

    // 通过 rowSelection.selections 自定义选择项，默认不显示下拉选项，设为 true 时显示默认选择项。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
};

_AM_CustomSelectComponent.storyName = "自定义选择项";

// ----------------------------------------------------------------

export const _AN_FilterAndSortComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Test",
          value: "Test",
        },
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: string | number | boolean, record) =>
        record.name.indexOf(value) !== -1,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      filterMultiple: false,
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["ascend", "descend", "ascend"], // 禁止排序恢复到默认状态
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.address.indexOf(value) !== -1,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  const onChange: FRCTableProps["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, FRCTableProps } from "frc-ui-pro/components/Table/table";

    // 对某一列数据进行筛选，使用列的 filters属性来指定需要筛选菜单的列，onFilter 用于筛选当前数据，filterMultiple 用于指定多选和单选。

    // 对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序按钮。
    // sorter:function(rowA, rowB) {...}， rowA、rowB 为比较的两个行数据。

    // sortDirections: ['ascend' | 'descend']改变每列可用的排序方式，切换排序时按数组内容依次切换，设置在 table props 上时对所有列生效。
    // 你可以通过设置 ['ascend', 'descend', 'ascend'] 禁止排序恢复到默认状态。
    // 使用 defaultSortOrder 属性，设置列的默认排序顺序。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        onChange={onChange}
        locale={{ filterConfirm: "确定", filterReset: "重置" }}
      />
    </>
  );
};

_AN_FilterAndSortComponent.storyName = "筛选和排序";

// ----------------------------------------------------------------

export const _AO_MultipleSortComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Chinese Score",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Math Score",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "English Score",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  const onChange: FRCTableProps["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, FRCTableProps } from "frc-ui-pro/components/Table/table";

    // column.sorter 支持 multiple 字段以配置多列排序优先级。
    // 通过 sorter.compare 配置排序逻辑，你可以通过不设置该函数只启动多列排序的交互形式。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

_AO_MultipleSortComponent.storyName = "多列排序";

// ----------------------------------------------------------------

export const _AP_ControlFilterAndSelectComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: FRCTableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: string | number | boolean, record) =>
        record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value: string | number | boolean, record) =>
        record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, FRCTableProps, SorterResult, FilterValue } from "frc-ui-pro/components/Table/table";

    // 使用受控属性对筛选和排序状态进行控制。
    // 1. columns 中定义了 filteredValue 和sortOrder 属性即视为受控模式。
    // 2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。
    // 3. 务必指定 column.key。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Button onClick={setAgeSort}>Sort age</Button>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
      <br />
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

_AP_ControlFilterAndSelectComponent.storyName = "可控的筛选和排序";

// ----------------------------------------------------------------

export const _AQ_ControlFilterAndSelectComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: { closeDropdown: boolean }) => void,
    dataIndex: DataIndex
  ) => {
    console.log("handleSearch", selectedKeys, confirm, dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnsTypeProps => ({
    filterDropdown: (props) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;

      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <span>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              icon={
                <Icon type="search" style={{ fontSize: 12, marginRight: 4 }} />
              }
              size="small"
            >
              Search
            </Button>
            <Button
              type="primary"
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ marginLeft: 8 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              style={{ marginLeft: 8, marginRight: 4 }}
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </span>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <Icon type="search" style={{ color: filtered ? "#F9C152" : "#3B9078" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#F9C152", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps, FilterConfirmProps } from "frc-ui-pro/components/Table/table";
    import { InputRef } from "frc-ui-pro/components/Input/input"
    import Highlighter from "react-highlight-words"

    // 通过 filterDropdown 自定义的列筛选功能，并实现一个搜索列的示例。
    // 给函数 clearFilters 添加 boolean 类型参数 closeDropdown，是否关闭筛选菜单，默认为 true。
    // 添加 boolean 类型参数 confirm，清除筛选时是否提交已选项，默认 true。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

_AQ_ControlFilterAndSelectComponent.storyName = "自定义筛选菜单";

// ----------------------------------------------------------------

export const _AR_MockRequestComponent = () => {
  interface DataType {
    name: {
      first: string;
      last: string;
    };
    gender: string;
    email: string;
    login: {
      uuid: string;
    };
  }

  interface Params {
    pagination?: PaginationConfig;
    sorter?: SorterResult<any> | SorterResult<any>[];
    total?: number;
    sortField?: string;
    sortOrder?: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "20%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const getRandomuserParams = (params: Params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  // --------------------------------------------------------------

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const fetchData = (params: Params = {}) => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData({ pagination });
  }, []);

  const handleTableChange = (
    newPagination: PaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    console.log("onChange", newPagination, filters, sorter);

    // 单列排序
    if (!Array.isArray(sorter)) {
      fetchData({
        sortField: sorter.field as string,
        sortOrder: sorter.order as string,
        pagination: newPagination,
        ...filters,
      });
    }
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import qs from "qs";
    import { ColumnsTypeProps, PaginationConfig, SorterResult } from "frc-ui-pro/components/Table/table";

    // 这个例子通过简单的 ajax读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面loading 效果。
    // 开发者可以自行接入其他数据处理方式。
    // 另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的onFilter 和 sorter 函数，而是在把筛选和排序的参数发到服务端来处理。
    // 当使用 rowSelection 时，请设置 rowSelection.preserveSelectedRowKeys 属性以保留 key。
    // 注意，此示例使用模拟接口，展示数据可能不准确，请打开网络面板查看请求。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

_AR_MockRequestComponent.storyName = "远程加载数据";

// ----------------------------------------------------------------

export const _AS_HeaderAndFooterComponent = () => {
  interface DataType {
    key: string;
    name: string;
    money: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <Button type="link">{text}</Button>,
      fixed: "left",
    },
    {
      title: "Cash Assets",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      money: "￥300,000.00",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      money: "￥1,256,000.00",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      money: "￥120,000.00",
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 添加页头和页脚。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Header"}
        footer={() => "Footer"}
      />

      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Header"}
        footer={() => "Footer"}
      />
    </>
  );
};

_AS_HeaderAndFooterComponent.storyName = "页头/页脚";

// ----------------------------------------------------------------

export const _AT_ExtendComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    { title: "Name", dataIndex: "name", key: "name", fixed: "left" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <Button type="link">Delete</Button>,
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps} from "frc-ui-pro/components/Table/table";

    // 当表格内容较多不能一次性完全展示时。
    // (tips: rowBgType 为 cross，会出现背景色冲突，功能正常)
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

_AT_ExtendComponent.storyName = "可展开";

// ----------------------------------------------------------------

export const _AU_SpecialColSortComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    { title: "Name", dataIndex: "name", key: "name" },
    Table.EXPAND_COLUMN,
    { title: "Age", dataIndex: "age", key: "age" },
    Table.SELECTION_COLUMN,
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 你可以通过 Table.EXPAND_COLUMN 和 Table.SELECT_COLUMN 来控制选择和展开列的顺序。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={data}
      />
    </>
  );
};

_AU_SpecialColSortComponent.storyName = "特殊列排序";

// ----------------------------------------------------------------

export const _AV_CombineRowAndColComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    tel: string;
    phone: number;
    address: string;
  }

  // In the fifth row, other columns are merged into first column
  // by setting it's colSpan to be 0
  const sharedOnCell = (_?: DataType, index?: number) => {
    if (index === 4) {
      return { colSpan: 0 };
    }

    return {};
  };

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <Button type="link">{text}</Button>,
      onCell: (_, index) => ({
        colSpan: (index as number) < 4 ? 1 : 5,
      }),
    },
    {
      title: "Age",
      dataIndex: "age",
      onCell: sharedOnCell,
    },
    {
      title: "Home phone",
      colSpan: 2,
      dataIndex: "tel",
      onCell: (_, index) => {
        if (index === 2) {
          return { rowSpan: 2 };
        }
        // These two are merged into above cell
        if (index === 3) {
          return { rowSpan: 0 };
        }
        if (index === 4) {
          return { colSpan: 0 };
        }

        return {};
      },
    },
    {
      title: "Phone",
      colSpan: 0,
      dataIndex: "phone",
      onCell: sharedOnCell,
    },
    {
      title: "Address",
      dataIndex: "address",
      onCell: sharedOnCell,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      tel: "0571-22098333",
      phone: 18889898888,
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "London No. 2 Lake Park",
    },
    {
      key: "5",
      name: "Jake White",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { Button } from "frc-ui-pro";
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 表头只支持列合并，使用 column 里的 colSpan 进行设置。
    // 表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table bordered columns={columns} dataSource={data} />
    </>
  );
};

_AV_CombineRowAndColComponent.storyName = "表格行/列合并";

// ----------------------------------------------------------------

export const _AW_TreeComponent = () => {
  interface DataType {
    key: React.ReactNode;
    name: string;
    age: number;
    address: string;
    children?: DataType[];
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
          children: [
            {
              key: 121,
              name: "Jimmy Brown",
              age: 16,
              address: "New York No. 3 Lake Park",
            },
          ],
        },
        {
          key: 13,
          name: "Jim Green sr.",
          age: 72,
          address: "London No. 1 Lake Park",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              children: [
                {
                  key: 1311,
                  name: "Jim Green jr.",
                  age: 25,
                  address: "London No. 3 Lake Park",
                },
                {
                  key: 1312,
                  name: "Jimmy Green sr.",
                  age: 18,
                  address: "London No. 4 Lake Park",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: RowSelectionProps = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // --------------------------------------------------------------

  const [checkStrictly, setCheckStrictly] = useState(false);

  // --------------------------------------------------------------

  const code = `
    // import code
    import { Switch } from "frc-ui-pro";
    import { ColumnsTypeProps, RowSelectionProps } from "frc-ui-pro/components/Table/table";

    // 表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 childrenColumnName 进行配置。
    // 可以通过设置 indentSize 以控制每一层的缩进宽度。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <span style={{ marginBottom: 16 }}>
        CheckStrictly:{" "}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </span>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </>
  );
};

_AW_TreeComponent.storyName = "树形数据展示";

// ----------------------------------------------------------------

export const _AX_JSXColumnsComponent = () => {
  const { Column, ColumnGroup } = Table;
  interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
  }

  const data: DataType[] = [
    {
      key: "1",
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // 使用 JSX 风格的 API（2.5.0 以后引入）

    // 这个只是一个描述 columns 的语法糖，所以你不能用其他组件去包裹 Column 和 ColumnGroup。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table bordered dataSource={data}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <span>
              <Button type="link">Invite {record.lastName}</Button>
              <Button type="link">Delete</Button>
            </span>
          )}
        />
      </Table>

      <Table bordered rowBgType="cross" dataSource={data}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <span>
              <Button type="link">Invite {record.lastName}</Button>
              <Button type="link">Delete</Button>
            </span>
          )}
        />
      </Table>
    </>
  );
};

_AX_JSXColumnsComponent.storyName = "JSX 风格";

// ----------------------------------------------------------------

export const _AY_TreeComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    street: string;
    building: string;
    number: number;
    companyAddress: string;
    companyName: string;
    gender: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.name.indexOf(value.toString()) === 0,
    },
    {
      title: "Other",
      children: [
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: 150,
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: "Address",
          children: [
            {
              title: "Street",
              dataIndex: "street",
              key: "street",
              width: 150,
            },
            {
              title: "Block",
              children: [
                {
                  title: "Building",
                  dataIndex: "building",
                  key: "building",
                  width: 100,
                },
                {
                  title: "Door No.",
                  dataIndex: "number",
                  key: "number",
                  width: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Company",
      children: [
        {
          title: "Company Address",
          dataIndex: "companyAddress",
          key: "companyAddress",
          width: 200,
        },
        {
          title: "Company Name",
          dataIndex: "companyName",
          key: "companyName",
        },
      ],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 80,
      fixed: "right",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: "John Brown",
      age: i + 1,
      street: "Lake Park",
      building: "C",
      number: 2035,
      companyAddress: "Lake Street 42",
      companyName: "SoftLake Co",
      gender: "M",
    });
  }

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // columns[n] 可以内嵌 children，以渲染分组表头。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "calc(700px + 50%)", y: 240 }}
      />

      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "calc(700px + 50%)", y: 240 }}
      />
    </>
  );
};

_AY_TreeComponent.storyName = "表头分组";

// ----------------------------------------------------------------

export const _AZ_EditCellComponent = () => {
  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
  }

  interface EditableRowProps {
    index: number;
  }

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div onClick={toggleEdit}>{children}</div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  type EditableTableProps = Parameters<typeof Table>[0];

  interface DataType {
    key: React.Key;
    name: string;
    age: string;
    address: string;
  }

  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

  // --------------------------------------------------------------

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button
            onClick={() => handleDelete(record.key)}
            type="link"
            style={{ verticalAlign: "unset" }}
          >
            Delete
          </Button>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // --------------------------------------------------------------

  const code = `
    // import code
    import React, { useContext, useEffect, useRef, useState } from 'react';
    import { Form } from 'antd';
    import type { FormInstance } from 'antd/es/form';
    import { Button, Form, Input, Table, InputRef } from 'frc-ui-pro';

    // 带单元格编辑功能的表格。当配合 shouldCellUpdate 使用时请注意闭包问题。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    </>
  );
};

_AZ_EditCellComponent.storyName = "可编辑单元格";

// ----------------------------------------------------------------

export const _BA_EditRowComponent = () => {
  interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const originData: Item[] = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // --------------------------------------------------------------

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.key)}
              style={{ marginRight: 8, verticalAlign: "unset" }}
            >
              Save
            </Button>
            <Button
              type="link"
              onClick={cancel}
              style={{ verticalAlign: "unset" }}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <Button
            type="link"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
            style={{ verticalAlign: "unset" }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // --------------------------------------------------------------

  const code = `
    // import code
    import { Form } from 'antd';
    import { Button, Form, Input, InputNumber, Table } from 'frc-ui-pro';

    // 带行编辑功能的表格。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName={() => "editable-row"}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

_BA_EditRowComponent.storyName = "可编辑行";

// ----------------------------------------------------------------

export const _BB_DragRowComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  interface DraggableBodyRowProps
    extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
  }

  const type = "DraggableBodyRow";

  const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }: DraggableBodyRowProps) => {
    const ref = useRef<HTMLTableRowElement>(null);

    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? " drop-over-downward" : " drop-over-upward",
        };
      },
      drop: (item: { index: number }) => {
        moveRow(item.index, index);
      },
    });

    const [, drag] = useDrag({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
      />
    );
  };

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  // --------------------------------------------------------------

  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Item Four",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Item Five",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Item Six",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Item Seven",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Item Eight",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "9",
      name: "Item Nine",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "10",
      name: "Item Ten",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  // --------------------------------------------------------------

  const code = `
    // import code
    import React, { useCallback, useRef, useState } from 'react';
    import { Table, ColumnsTypeProps } from 'frc-ui-pro';

    import update from 'immutability-helper';
    import { DndProvider, useDrag, useDrop } from 'react-dnd';
    import { HTML5Backend } from 'react-dnd-html5-backend';

    // 使用自定义元素，我们可以集成 react-dnd 来实现拖拽排序。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          dataSource={data}
          components={components}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            };
            return attr as React.HTMLAttributes<any>;
          }}
          scroll={{ x: 1000, y: 200 }}
        />
      </DndProvider>
    </>
  );
};

_BB_DragRowComponent.storyName = "拖拽排序";

// ----------------------------------------------------------------

export const _BC_HandleDragRowComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    index: number;
  }

  const DragHandle = SortableHandle(() => (
    <Icon
      style={{ cursor: "grab", color: "#ffebc8", fontSize: 14 }}
      type="drag-drop"
    />
  ));

  const columns: ColumnsTypeProps[] = [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 50,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "Name",
      dataIndex: "name",
      className: "drag-visible",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      index: 0,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      index: 1,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      index: 2,
    },
  ];

  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
  );
  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    )
  );

  // --------------------------------------------------------------

  const [dataSource, setDataSource] = useState(data);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataSource.slice(),
        oldIndex,
        newIndex
      ).filter((el: DataType) => !!el);
      console.log("Sorted items: ", newData);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="frc-table-drag-row"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({
    className,
    style,
    ...restProps
  }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} className={className} {...restProps} />;
  };

  // --------------------------------------------------------------

  const code = `
    // import code
    import React, { useState } from 'react';
    import { Table } from 'frc-ui-pro';
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    import { arrayMoveImmutable } from 'array-move';

    import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
    import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

    // 也可以使用 react-sortable-hoc 来实现一个拖拽操作列。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  );
};

_BC_HandleDragRowComponent.storyName = "拖拽手柄列";

// ----------------------------------------------------------------

export const _BD_CellEllipsisComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="link">{text}</Button>,
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address 1",
      ellipsis: true,
    },
    {
      title: "Long Column Long Column Long Column",
      dataIndex: "address",
      key: "address 2",
      ellipsis: true,
    },
    {
      title: "Long Column Long Column",
      dataIndex: "address",
      key: "address 3",
      ellipsis: true,
    },
    {
      title: "Long Column",
      dataIndex: "address",
      key: "address 4",
      ellipsis: true,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 2 Lake Park, London No. 2 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import React from 'react';
    import { Table, Button } from 'frc-ui-pro';
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 设置 column.ellipsis 可以让单元格内容根据宽度自动省略。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

_BD_CellEllipsisComponent.storyName = "单元格自动省略";

// ----------------------------------------------------------------

export const _BE_CustomCellEllipsisToolTipComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="link">{text}</Button>,
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address 1",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column Long Column Long Column",
      dataIndex: "address",
      key: "address 2",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column Long Column",
      dataIndex: "address",
      key: "address 3",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column",
      dataIndex: "address",
      key: "address 4",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 2 Lake Park, London No. 2 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import React from 'react';
    import { Table, Button, Tooltip } from 'frc-ui-pro';
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 设置 column.ellipsis.showTitle 关闭单元格内容自动省略后默认的 title 提示, 使用 Tooltip 替代。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

_BE_CustomCellEllipsisToolTipComponent.storyName = "自定义单元格省略提示";

// ----------------------------------------------------------------

export const _BF_VirtualListComponent = () => {
  const VirtualTable = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map((column) => {
      if (column.width) {
        return column;
      }

      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
      const obj = {};
      Object.defineProperty(obj, "scrollLeft", {
        get: () => {
          if (gridRef.current) {
            return gridRef.current?.state?.scrollLeft;
          }
          return null;
        },
        set: (scrollLeft: number) => {
          if (gridRef.current) {
            gridRef.current.scrollTo({ scrollLeft });
          }
        },
      });

      return obj;
    });

    const resetVirtualGrid = () => {
      gridRef.current?.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (
      rawData: object[],
      { scrollbarSize, ref, onScroll }: any
    ) => {
      ref.current = connectObject;
      const totalHeight = rawData.length * 25;

      return (
        <Grid
          ref={gridRef}
          className="frc-table-virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index: number) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll!.y! &&
              index === mergedColumns.length - 1
              ? (width as number) - scrollbarSize - 1
              : (width as number);
          }}
          height={scroll!.y as number}
          rowCount={rawData.length}
          rowHeight={() => 25}
          width={tableWidth}
          onScroll={({ scrollLeft }: { scrollLeft: number }) => {
            onScroll({ scrollLeft });
          }}
        >
          {({
            columnIndex,
            rowIndex,
            style,
          }: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
          }) => (
            <div
              className={classNames("virtual-table-cell", {
                "virtual-table-cell-last":
                  columnIndex === mergedColumns.length - 1,
              })}
              style={style}
            >
              {
                (rawData[rowIndex] as any)[
                  (mergedColumns as any)[columnIndex].dataIndex
                ]
              }
            </div>
          )}
        </Grid>
      );
    };

    return (
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          components={{
            body: renderVirtualList as any,
          }}
        />
      </ResizeObserver>
    );
  };

  // Usage
  const columns = [
    { title: "A", dataIndex: "key", width: 150 },
    { title: "B", dataIndex: "key" },
    { title: "C", dataIndex: "key" },
    { title: "D", dataIndex: "key" },
    { title: "E", dataIndex: "key", width: 200 },
    { title: "F", dataIndex: "key", width: 100 },
  ];

  const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

  // --------------------------------------------------------------

  const code = `
    // import code
    import React, { useEffect, useRef, useState } from 'react';
    import { Table } from 'frc-ui-pro';

    import classNames from 'classnames';
    import ResizeObserver from 'rc-resize-observer';
    import { VariableSizeGrid as Grid } from 'react-window';

    // 通过 react-window 引入虚拟滚动方案，实现 100000 条数据的高性能表格。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{ y: 300, x: "100vw" }}
      />
    </>
  );
};

_BF_VirtualListComponent.storyName = "虚拟列表";

// ----------------------------------------------------------------

export const _ZZ_FixedTopComponent = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: any[] = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
      width: 150,
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
      width: 150,
    },
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
      width: 150,
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
      width: 150,
    },
    { title: "Column 8", dataIndex: "address", key: "8" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <Button type="link">action</Button>,
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  // --------------------------------------------------------------

  const [fixedTop, setFixedTop] = useState(false);

  // --------------------------------------------------------------

  const code = `
    // import code
    import React, { useState } from 'react';
    import { Switch, Table, Button } from 'frc-ui-pro';
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 对于长表格，需要滚动才能查看表头和滚动条，那么现在可以设置跟随页面固定表头和滚动条。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        summary={() => (
          <AntdTable.Summary fixed={fixedTop ? "top" : "bottom"}>
            <AntdTable.Summary.Row>
              <AntdTable.Summary.Cell index={0} colSpan={2}>
                <Switch
                  checkedChildren="Fixed Top"
                  unCheckedChildren="Fixed Top"
                  checked={fixedTop}
                  onChange={() => {
                    setFixedTop(!fixedTop);
                  }}
                />
              </AntdTable.Summary.Cell>
              <AntdTable.Summary.Cell index={2} colSpan={8}>
                Scroll Context
              </AntdTable.Summary.Cell>
              <AntdTable.Summary.Cell index={10}>
                Fix Right
              </AntdTable.Summary.Cell>
            </AntdTable.Summary.Row>
          </AntdTable.Summary>
        )}
        sticky
      />
    </>
  );
};

_ZZ_FixedTopComponent.storyName = "随页面滚动的固定表头和滚动条";

// ----------------------------------------------------------------

// 必须置于顶层，否则无法获取到 ref
const ResizeableTitle = (props: any) => {
  const { onResize, onResizeStart, onResizeStop, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export const _BH_DragComplexComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    age1: number;
    age2: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const [tableColumns, setTableColumns] = useState<ColumnsTypeProps[]>([
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "150px",
      minResizeWidth: "100px",
    },
    {
      title: "Age",
      children: [
        {
          title: "Age1",
          dataIndex: "age1",
          width: "150px",
          fixed: "left",
          minResizeWidth: "50px",
        },
        {
          title: "Age2",
          dataIndex: "age2",
          width: "150px",
          fixed: "left",
          minResizeWidth: "50px",
        },
      ],
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "250px",
      minResizeWidth: "200px",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: "100px",
      minResizeWidth: "50px",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "100px",
      minResizeWidth: "60px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      width: "100px",
      minResizeWidth: "60px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "150px",
      minResizeWidth: "100px",
    },
    {
      title: "Description",
      dataIndex: "description",
      fixed: "right",
      width: "200px",
      minResizeWidth: "150px",
    },
  ]);

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  // --------------------------------------------------------------

  const changeColumns = (
    columns: ColumnsTypeProps[],
    key: any,
    config: ColumnsTypeProps
  ) => {
    return columns.map((column) => {
      let columnProps = {};

      if (column.dataIndex === key) {
        columnProps = {
          ...columnProps,
          ...config,
        };
      }

      if (column.children) {
        columnProps = {
          ...columnProps,
          children: changeColumns(column.children, key, config),
        };
      }

      return { ...column, ...columnProps };
    });
  };

  const [reSizeColumn, setReSizeColumn] = useState<ColumnsTypeProps>();

  const searchedColumn = (columns: ColumnsTypeProps[], key: any) => {
    return columns.find((column) => {
      if (column.dataIndex === key) {
        setReSizeColumn(column);
        return true;
      }
      if (column.children) {
        searchedColumn(column.children, key);
      }

      return false;
    });
  };

  const handleResize =
    (key: any) =>
    async (e: any, { size }: any) => {
      let nextColumns = [...tableColumns];
      await searchedColumn(nextColumns, key);

      const minWidth =
        Number(reSizeColumn?.minResizeWidth?.toString().match(/\d+/i)?.[0]) ||
        0;

      nextColumns = changeColumns(nextColumns, key, {
        width: size.width > minWidth ? size.width : minWidth,
      });

      setTableColumns(nextColumns);
    };

  const handleResizeStart =
    (key: any) =>
    (e: any, { size }: any) => {
      let nextColumns = [...tableColumns];

      nextColumns = changeColumns(nextColumns, key, {
        className: `${reSizeColumn?.className || ""} frc-resizeable-start`,
      });

      setTableColumns(nextColumns);
    };

  const handleResizeStop =
    (key: any) =>
    (e: any, { size }: any) => {
      let nextColumns = [...tableColumns];

      nextColumns = changeColumns(nextColumns, key, {
        className: reSizeColumn?.className?.replace(
          / frc-resizeable-start/g,
          ""
        ),
      });

      setTableColumns(nextColumns);
    };

  const columnse = (columns: ColumnsTypeProps[]) => {
    return columns.map((col) => {
      let columnProps = {};

      if (col.children) {
        columnProps = {
          ...columnProps,
          children: columnse(col.children),
        };
      } else {
        columnProps = {
          ...columnProps,
          onHeaderCell: (col: any) => ({
            width: Number(col.width?.toString().match(/\d+/i)[0]),
            onResizeStart: handleResizeStart(col.dataIndex),
            onResize: handleResize(col.dataIndex),
            onResizeStop: handleResizeStop(col.dataIndex),
          }),
        };
      }

      return {
        ...col,
        ...columnProps,
      };
    });
  };

  // --------------------------------------------------------------

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      age1: 321,
      age2: 322,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      age1: 321,
      age2: 322,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      age1: 321,
      age2: 322,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { useState } from 'react';
    import { Table } from 'frc-ui-pro';
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    import { Resizable } from "react-resizable";

    // 拖拽组件 - ResizeableTitle - 必须置于顶层，否则无法获取到 ref
    const ResizeableTitle = (props: any) => {
      const { onResize, onResizeStart, onResizeStop, width, ...restProps } = props;

      if (!width) {
        return <th {...restProps} />;
      }

      return (
        <Resizable
          width={width}
          height={0}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          draggableOpts={{ enableUserSelectHack: false }}
        >
          <th {...restProps} />
        </Resizable>
      );
    };

    // 通过 react-resizable 引入，实现拖拽调整列宽
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        bordered
        components={components}
        columns={columnse(tableColumns)}
        dataSource={data}
        pagination={false}
        scroll={{ x: 900, y: 300 }}
      />
    </>
  );
};

_BH_DragComplexComponent.storyName = "拖拽调整列宽";

// ----------------------------------------------------------------

export const _BI_BoldBorderComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
    action: string;
    sex: "male" | "female";
    phone: number;
    description: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "120px",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      align: "center",
      width: "120px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "300px",
      align: "center",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
      align: "center",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "100px",
      align: "center",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      align: "center",
      // fixed: "right",
      width: "120px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "150px",
      // fixed: "right",
      align: "center",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968711111,
      description: "something else",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "male",
      phone: 13968722222,
      description: "something else",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: "1",
      action: "create",
      sex: "female",
      phone: 13968733333,
      description: "something else",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        size="large"
        headerSize="small"
        bordered
        borderedActiveFixed="bold"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_BI_BoldBorderComponent.storyName = "固定列粗边框";

// ----------------------------------------------------------------

export const _BJ_CheckboxGroupComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    checkboxCellKey: string;
    description: string;
  }

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox1",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",

      description: "something else",
      checkboxCellKey: "checkbox2",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox3",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox4",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox5",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox6",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox7",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox8",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox9",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox10",
    },
    {
      key: "11",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox11",
    },
    {
      key: "12",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox12",
    },
    {
      key: "13",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox13",
    },
    {
      key: "14",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox14",
    },
    {
      key: "15",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox15",
    },
    {
      key: "16",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox16",
    },
    {
      key: "17",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox17",
    },
    {
      key: "18",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
      checkboxCellKey: "checkbox18",
    },
  ];

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);

  const checkDataArr = data.map((item) => item.checkboxCellKey);

  const onChange = (e: any, key: string) => {
    let newArr: string[] = [];

    // 勾选
    if (e.target.checked && key) {
      newArr = [...checkedList, key];
    }

    // 取消勾选
    if (!e.target.checked && key) {
      newArr = [...checkedList].filter((item) => item !== key);
    }

    setCheckedList(newArr);

    // 激活 checkHeader 半全选样式
    if (newArr.length > 0 && newArr.length !== checkDataArr.length) {
      setIndeterminate(true);
    }
  };

  const onCheckAllChange = (e: any) => {
    console.log(`checked header = ${e.target.checked}`);

    setCheckedList(e.target.checked ? checkDataArr : []);
    setIndeterminate(false);
  };

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "120px",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      align: "center",
      width: "120px",
    },
    {
      title: (
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange}>
          Header04
        </Checkbox>
      ),
      dataIndex: "checkboxCellKey",
      key: "checkboxCellKey",
      width: "150px",
      align: "center",
      render: (value, record, index) => {
        return (
          <Checkbox
            checked={checkedList.some((item) => item === value)}
            onChange={(e) => onChange(e, value)}
          />
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "200px",
      align: "center",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "150px",
      // fixed: "right",
      align: "center",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { Table, Checkbox } from "frc-ui-pro";
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        size="large"
        headerSize="middle"
        bordered
        borderedActiveFixed="bold"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_BJ_CheckboxGroupComponent.storyName = "Checkbox 特殊列";

// ----------------------------------------------------------------

export const _BK_ScrollEndComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    description: string;
  }

  const [data, setData] = useState<any[]>([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
  ]);

  const dataMock: DataType[] = [
    {
      key: (Math.random() * 100).toString(),
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: (Math.random() * 100).toString(),
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
  ];

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "120px",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      width: "120px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "400px",
      align: "center",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "150px",
      fixed: "right",
      align: "center",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
        pagination={false}
        onScrollEnd={() => setData([...data].concat(dataMock))}
      />
    </>
  );
};

_BK_ScrollEndComponent.storyName = "滚动加载（翻页拼接）";

// ----------------------------------------------------------------

export const _BL_MessageTipComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    description: string;
  }

  const [data, setData] = useState<any[]>([
    {
      key: "1",
      name: "John Brown123",
      age: 32,
      address: "New York No. 1 Lake Park123",
      description: "something else123",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "10",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
  ]);
  const [activeRowKey, setActiveRowKey] = useState<string>();

  // mock update data ---------------------------------------------

  const dataMock: DataType[] = [
    {
      key: data.length + 1 + "",
      name: "新推送：" + (data.length + 1),
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
  ];

  setTimeout(() => {
    setData([...dataMock].concat([...data]));
  }, 4000);

  // --------------------------------------------------------------

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "120px",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      width: "120px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "400px",
      align: "center",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "150px",
      fixed: "right",
      align: "center",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // rowActiveFixedData 启动 “固定数据” 效果
    // rowActiveFixedTip 设置 “固定提示” 文案
    // rowActiveFirstGradient 启动 “首条数据” 渐变效果（每次 data change，都会触发）

    // 注意：此功能必须设置 “scroll” 属性，否则无效。
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
        pagination={false}
        rowActive={activeRowKey}
        rowActiveFixedData={true}
        rowActiveFixedTip={"有新消息"}
        rowActiveFirstGradient={true}
        onRow={(record) => {
          return {
            onClick: (e) => {
              setActiveRowKey(record.key);
            },
          };
        }}
      />
    </>
  );
};

_BL_MessageTipComponent.storyName = "新消息提醒（常用于推送）";
