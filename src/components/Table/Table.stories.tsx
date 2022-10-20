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
} from "../../index";

import {
  FRCTableProps,
  ColumnsTypeProps,
  FilterValue,
  SorterResult,
  PaginationConfig,
  RowSelectionProps,
} from "./table";

import { InputRef } from "../Input/input";

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

export const Default = () => {
  interface DataType {
    key: number;
    name: string;
    age: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
    key: key,
    name: `name-${key}`,
    age: `age-${key}`,
    address: `address-${key}`,
  }));

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 基于 虚拟滚动 的表格
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

Default.storyName = "默认 table";

// ----------------------------------------------------------------

export const _AA_RowBgComponent = () => {
  interface DataType {
    key: number;
    name: string;
    age: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
    key: key,
    name: `name-${key}`,
    age: `age-${key}`,
    address: `address-${key}`,
  }));

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

export const _AB_BorderComponent = () => {
  interface DataType {
    key: number;
    name: string;
    age: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
    key: key,
    name: `name-${key}`,
    age: `age-${key}`,
    address: `address-${key}`,
  }));

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
      <Table bordered rowBgType="default" columns={columns} dataSource={data} />
      <br />
      cross
      <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
    </>
  );
};

_AB_BorderComponent.storyName = "边框 border";

// ----------------------------------------------------------------

export const _AC_NoDataComponent = () => {
  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 根据 height 属性，自动计算出 empty 表格的高度
    // height 属性，默认为 300
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      default
      <Table
        rowBgType="default"
        columns={columns}
        dataSource={[]}
        height="256px"
      />
      <br />
      cross
      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={[]}
        height="256px"
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
      <Table columns={columns} dataSource={data} loading />
    </>
  );
};

_AD_LoadingComponent.storyName = "加载中 loading";

// ----------------------------------------------------------------

export const _AE_SizeComponent = () => {
  interface DataType {
    key: number;
    name: string;
    age: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
    key: key,
    name: `name-${key}`,
    age: `age-${key}`,
    address: `address-${key}`,
  }));

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
    key: number;
    name: string;
    age: string;
    address: string;
  }

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
  ];

  const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
    key: key,
    name: `name-${key}`,
    age: `age-${key}`,
    address: `address-${key}`,
  }));

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
      // fixed: "left",
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
      fixed: "right",
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
      <Table bordered columns={columns} dataSource={data} />
      <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
      <Table bordered size="middle" columns={columns} dataSource={data} />
      <Table bordered size="large" columns={columns} dataSource={data} />
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
        test={true}
      />
    </>
  );
};

_AH_SummaryComponent.storyName = "总结栏/置顶拦";

// ----------------------------------------------------------------
