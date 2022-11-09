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
  Modal,
  Filter,
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

import orderBy from "lodash/orderBy";
import "./_story.scss";

export default {
  title: "数据显示/Table表格 (Beta)",
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
      <Table bordered size="large" columns={columns} dataSource={data} />
      <Table bordered size="large" columns={columns} dataSource={[]} />
      <Table
        bordered
        size="large"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <Table
        bordered
        size="large"
        rowBgType="cross"
        columns={columns}
        dataSource={[]}
      />
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
      <Table bordered headerSize="small" columns={columns} dataSource={data} />
      <Table
        bordered
        headerSize="small"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <br />
      middle
      <Table bordered headerSize="middle" columns={columns} dataSource={data} />
      <Table
        bordered
        headerSize="middle"
        rowBgType="cross"
        columns={columns}
        dataSource={data}
      />
      <br />
      large
      <Table bordered headerSize="large" columns={columns} dataSource={data} />
      <Table
        bordered
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
      width: "100px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      // fixed: "left",
      width: "80px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "200px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "50px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "100px",
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
      width: "50px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "200px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "50px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "80px",
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
      />

      <Table
        bordered
        columns={columns}
        dataSource={data}
        summary={() => {
          return (
            <Table.Summary fixed="bottom">
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
      />
    </>
  );
};

_AH_SummaryComponent.storyName = "总结栏/置顶拦";

// ----------------------------------------------------------------

export const _AI_CustomCellTitleComponent = () => {
  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 350,
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
      width: 350,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 350,
    },
  ];

  const data: any[] = Array.from({ length: 30 }, (_, key) => ({
    key: key.toString(),
    name: `name-${key}`,
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
    address: `address-${key}`,
  }));
  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

    // 例：配合 Select 组件，实现表格 “单元格” 的自定义： “头部选择”、“数据选择”
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table bordered columns={columns} dataSource={data} />
      <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
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
      width: "200px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "50px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "80px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "80px",
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
      <Table
        bordered
        columns={columns}
        dataSource={data}
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
      width: "200px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "50px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "80px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: "100px",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "300px",
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

    {
      key: "19",
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
      key: "20",
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
      key: "21",
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
      key: "22",
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
      key: "23",
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
      key: "24",
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
      key: "25",
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
      key: "26",
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
      key: "27",
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
      key: "28",
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
      key: "29",
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
      key: "30",
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
      key: "31",
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
      key: "32",
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
      key: "33",
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
      key: "34",
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
      key: "35",
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
      key: "36",
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
        bordered
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Table
        bordered
        size="middle"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Table
        bordered
        rowBgType="cross"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Table
        bordered
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Table
        bordered
        rowBgType="cross"
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
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
      width: "300px",
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "300px",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "500px",
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
      width: "300px",
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "300px",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "500px",
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
      width: "300px",
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["ascend", "descend", "ascend"], // 禁止排序恢复到默认状态
      width: "300px",
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
      width: "300px",
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
    {
      key: "5",
      name: "Jim Red1",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "6",
      name: "Jim Red2",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "7",
      name: "Jim Red3",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "8",
      name: "Jim Red4",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "9",
      name: "Jim Red5",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "10",
      name: "Jim Red5",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "11",
      name: "Jim Red5",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "12",
      name: "Jim Red5",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "13",
      name: "Jim Red5",
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
      width: "300px",
    },
    {
      title: "Chinese Score",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      width: "300px",
    },
    {
      title: "Math Score",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
      width: "300px",
    },
    {
      title: "English Score",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      width: "300px",
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
    {
      key: "5",
      name: "Jim Red",
      chinese: 188,
      math: 199,
      english: 189,
    },
    {
      key: "6",
      name: "Jim Red",
      chinese: 288,
      math: 299,
      english: 289,
    },
    {
      key: "7",
      name: "Jim Red",
      chinese: 388,
      math: 399,
      english: 389,
    },
    {
      key: "8",
      name: "Jim Red",
      chinese: 488,
      math: 499,
      english: 489,
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        height={200}
      />
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
      width: "300px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      width: "300px",
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
      width: "300px",
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        height={100}
      />
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
      width: "300px",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "200px",
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
      <Table
        rowKey="key"
        bordered
        columns={columns}
        dataSource={data}
        height={100}
      />
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
      width: "200px",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      width: "300px",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "500px",
    },
  ];

  const getRandomuserParams = (params: Params) => ({
    results: 100,
    ...params,
  });

  // --------------------------------------------------------------

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = (params: Params = {}) => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
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
        dataSource={data || []}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

_AR_MockRequestComponent.storyName = "远程加载数据";

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
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "300px",
    },
    { title: "Age", dataIndex: "age", key: "age", width: "300px" },
    { title: "Address", dataIndex: "address", key: "address", width: "500px" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Button type="link" style={{ height: 23 }}>
          Delete
        </Button>
      ),
      width: "500px",
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
    {
      key: 5,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 6,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 7,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 8,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 9,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 10,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 11,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 12,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 13,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 14,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 15,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 16,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 17,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 18,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 19,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 20,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 21,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 22,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 23,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 24,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 25,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 26,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 27,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 28,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 29,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: "dsadas",
      name: "Jim Green",
      age: 30,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
  ];

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps} from "frc-ui-pro/components/Table/table";

    // 当表格内容较多不能一次性完全展示时。
    // (tips: rowBgType 为 cross，会出现背景色冲突，功能正常)

    // 必传参数：rowKey

    // !!!注意，使用必看：使用 expandedRowRender 、expandedRowClassName 时：
    // 计算或赋值时，不要依赖 index 作为标识，否则会出现数据错乱的情况，可使用 rowKey 或自己为 data 维护一套标识
    // 错误事例：
    //      expandedRowRender: (record, index) => (
    //        <div style={{ margin: 0, height: index === 0 ? 200 : 100 }}>
    //          {record.description}
    //        </div>
    //      )
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        rowKey={"key"}
        columns={columns}
        expandable={{
          expandedRowRender: (record, index) => (
            <div style={{ margin: 0, height: record.key === 1 ? 200 : 100 }}>
              {record.description}
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
          onExpandedRowsChange: (expandedRows) => {
            console.log("expandedRows", expandedRows);
          },
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
    {
      key: 5,
      name: "Joe Black 5",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 6,
      name: "Joe Black 6",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 7,
      name: "Joe Black 7",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 8,
      name: "Joe Black 8",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 9,
      name: "Joe Black 9",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 10,
      name: "Joe Black 10",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 11,
      name: "Joe Black 11",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 12,
      name: "Joe Black 12",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 13,
      name: "Joe Black 13",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 14,
      name: "Joe Black 14",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 15,
      name: "Joe Black 15",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 16,
      name: "Joe Black 16",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 17,
      name: "Joe Black 17",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 18,
      name: "Joe Black 18",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 19,
      name: "Joe Black 19",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 20,
      name: "Joe Black 20",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 21,
      name: "Joe Black 21",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 22,
      name: "Joe Black 22",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 23,
      name: "Joe Black 23",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 24,
      name: "Joe Black 24",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 25,
      name: "Joe Black 25",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 26,
      name: "Joe Black 26",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 27,
      name: "Joe Black 27",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 28,
      name: "Joe Black 28",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 29,
      name: "Joe Black 29",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
    {
      key: 30,
      name: "Joe Black 30",
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
        rowKey="key"
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

// // ----------------------------------------------------------------

// export const _BL_MessageTipComponent = () => {
//   interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//     description: string;
//     animeKey?: string | number;
//   }

//   const [data, setData] = useState<any[]>([
//     {
//       key: "1",
//       name: "John Brown123",
//       age: 32,
//       address: "New York No. 1 Lake Park123",
//       description: "something else123",
//     },
//     {
//       key: "2",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "3",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "4",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "5",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "6",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "7",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "8",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "9",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "10",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "11",
//       name: "John Brown123",
//       age: 32,
//       address: "New York No. 1 Lake Park123",
//       description: "something else123",
//     },
//     {
//       key: "12",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "13",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "14",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "15",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "16",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "17",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "18",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "19",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       description: "something else",
//     },
//     {
//       key: "20",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       description: "something else",
//     },
//   ]);
//   const [activeRowKey, setActiveRowKey] = useState<string>();

//   // mock update data ---------------------------------------------

//   useEffect(() => {
//     setInterval(() => {
//       setData((pre) => {
//         const dataMock: DataType[] = [
//           {
//             key: pre.length + 1 + "",
//             name: "新推送：" + (pre.length + 1),
//             age: 42,
//             address: "London No. 1 Lake Park",
//             description: "something else",
//             animeKey: pre.length + 1 + "", // 用于动画
//           },
//         ];

//         return [...dataMock].concat([...pre]);
//       });
//     }, 1000);
//   }, []);

//   // --------------------------------------------------------------

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       width: "300px",
//       align: "center",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       align: "center",
//       width: "120px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: "400px",
//       align: "center",
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//       width: "300px",
//       fixed: "right",
//       align: "center",
//     },
//   ];

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

//     // rowActiveFixedData 启动 “固定数据” 效果
//     // rowActiveFixedTip 设置 “固定提示” 文案
//     // rowActiveFirstGradient 启动 “数据” 渐变效果 (每次 data change, 都会触发)
//     // animeRowKey 为 “数据” 渐变效果的 key。(!!!: 有推送时，处理 item 时自行添加 animeRowKey, 否则无效)
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table
//         animeRowKey="animeKey"
//         columns={columns}
//         dataSource={data}
//         rowActive={activeRowKey}
//         rowActiveFixedData={true}
//         rowActiveFixedTip={"有新消息"}
//         rowActiveFirstGradient={true}
//         onRow={(record) => {
//           return {
//             onClick: (e) => {
//               setActiveRowKey(record.key);
//             },
//           };
//         }}
//       />
//     </>
//   );
// };

// _BL_MessageTipComponent.storyName = "新消息提醒（常用于推送，defective）";

// // ----------------------------------------------------------------

// const socket = new WebSocket("ws://172.16.74.20:8088");
// export const _ZZ_CustomTableComponent = () => {
//   const [tableData, setTableData] = useState<any[]>([]);
//   const [socketMessage, setSocketMessage] = useState<any[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const [modalList, setModalList] = useState<any[]>([]);
//   const [tableColumns, setTableColumns] = useState<any[]>([]);
//   const [checkedKeys, setCheckedKeys] = useState<any[]>(
//     localStorage.getItem("checkedConfig")?.split(",") || []
//   );

//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [requstId, setRequestId] = useState<number>(-1);
//   const [filterRadio, setFilterRadio] = useState<any[]>(["ALL"]);

//   const columns: any[] = [
//     {
//       title: "剩余期限",
//       dataIndex: "residualMaturity",
//       key: "residualMaturity",
//       // fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "bondKey",
//       dataIndex: "bondKey",
//       key: "bondKey",
//       ellipsis: true,
//       // fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "listedMarket",
//       dataIndex: "listedMarket",
//       key: "listedMarket",
//       // fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "债券简称",
//       dataIndex: "bondNm",
//       key: "bondNm",
//       width: "200px",
//     },
//     {
//       title: "票面利率",
//       dataIndex: "couponRt",
//       key: "couponRt",
//       width: "100px",
//     },
//     {
//       title: "主体评级",
//       dataIndex: "instRt",
//       key: "instRt",
//       width: "100px",
//     },
//     {
//       title: "债项评级",
//       dataIndex: "bondRt",
//       key: "bondRt",
//       width: "100px",
//     },
//     {
//       title: "展望评级",
//       dataIndex: "brokerOfrFwdYld",
//       key: "brokerOfrFwdYld",
//       width: "100px",
//     },
//     {
//       title: "含权类型",
//       dataIndex: "optEmbeddedTyp",
//       key: "optEmbeddedTyp",
//       width: "100px",
//     },
//     {
//       title: "行权日",
//       dataIndex: "strikeDt",
//       key: "strikeDt",
//       width: "100px",
//     },
//     {
//       title: "到期日",
//       dataIndex: "maturityDt",
//       key: "maturityDt",
//       width: "100px",
//     },
//     {
//       title: "跨市场",
//       dataIndex: "bnkFlg",
//       key: "bnkFlg",
//       width: "100px",
//     },
//     {
//       title: "债券余额(亿)",
//       dataIndex: "outstandingAmt",
//       key: "outstandingAmt",
//       width: "100px",
//     },
//     {
//       title: "产品",
//       dataIndex: "securitySubTyp",
//       key: "securitySubTyp",
//       width: "100px",
//     },
//     {
//       title: "经纪商",
//       dataIndex: "contributorId",
//       key: "contributorId",
//       width: "100px",
//     },
//     {
//       title: "最后更新",
//       dataIndex: "marketDataTm",
//       key: "marketDataTm",
//       width: "200px",
//     },
//     {
//       title: "Vol.Bid",
//       dataIndex: "bidVol",
//       key: "bidVol",
//       width: "100px",
//     },
//     {
//       title: "Bid参考净价",
//       dataIndex: "bidPrc",
//       key: "bidPrc",
//       width: "100px",
//     },
//     {
//       title: "Bid",
//       dataIndex: "bidPx",
//       key: "bidPx",
//       width: "100px",
//     },
//     {
//       title: "Ofr",
//       dataIndex: "ofrPx",
//       key: "ofrPx",
//       width: "100px",
//     },
//     {
//       title: "Ofr参考净价",
//       dataIndex: "askPrc",
//       key: "askPrc",
//       width: "100px",
//     },
//     {
//       title: "Vol.Ofr",
//       dataIndex: "askVol",
//       key: "askVol",
//       width: "100px",
//     },
//     {
//       title: "中债估值到期",
//       dataIndex: "valuation1",
//       key: "valuation1",
//       width: "100px",
//     },
//     {
//       title: "中债估值行权",
//       dataIndex: "valuation5",
//       key: "valuation5",
//       width: "100px",
//     },
//     {
//       title: "中证估值到期",
//       dataIndex: "valuation2",
//       key: "valuation2",
//       width: "100px",
//     },
//     {
//       title: "中证估值行权",
//       dataIndex: "valuation6",
//       key: "valuation6",
//       width: "100px",
//     },
//     {
//       title: "bid-中债(BP)",
//       dataIndex: "bidSpread1",
//       key: "bidSpread1",
//       width: "100px",
//     },
//     {
//       title: "中债-Ofr(BP)",
//       dataIndex: "askSpread1",
//       key: "askSpread1",
//       width: "100px",
//     },
//     {
//       title: "bid-中证(BP)",
//       dataIndex: "bidSpread2",
//       key: "bidSpread2",
//       width: "100px",
//     },
//     {
//       title: "中证-Ofr(BP)",
//       dataIndex: "askSpread2",
//       key: "askSpread2",
//       width: "100px",
//     },
//     {
//       title: "Bid报价状态",
//       dataIndex: "bidQuoteSts",
//       key: "bidQuoteSts",
//       width: "100px",
//     },
//     {
//       title: "Ask报价状态",
//       dataIndex: "askQuoteSts",
//       key: "askQuoteSts",
//       width: "100px",
//     },
//     {
//       title: "消息序号",
//       dataIndex: "msgSeq",
//       key: "msgSeq",
//       width: "300px",
//     },
//     {
//       title: "Bid编号",
//       dataIndex: "bidQuoteId",
//       key: "bidQuoteId",
//       width: "300px",
//     },
//     {
//       title: "Ask编号",
//       dataIndex: "askQuoteId",
//       key: "askQuoteId",
//       width: "300px",
//     },
//   ];

//   // -------------------------------------------------------------

//   const fetchColumns = (e: any) => {
//     socket.send(`{"cmd":"schema", "id": ${requstId + 1}}`);
//     setRequestId(requstId + 1);
//     setIsOpen(true);
//   };

//   const sendRequest = (event: any) => {
//     const data: any = JSON.parse(event.data);
//     // console.log('in-data', data);

//     if (data.id === 0) {
//       setRequestId(0);
//     }

//     if (data?.payload?.title === "quote") {
//       // console.log('data', data);
//       let config: any = [];
//       for (let key in data.payload.properties) {
//         config.push({
//           title: data.payload.properties[key]?.cnName || key,
//           key,
//         });
//       }

//       const newKeys = (config as any[]).map((item) => item.key);
//       const newColumns = columns.filter(
//         (column) => newKeys.indexOf(column.key) !== -1
//       );
//       setModalList(newColumns);

//       if (!localStorage.getItem("checkedConfig")) {
//         setTableColumns(newColumns);
//       }
//     } // columns

//     if (data?.payload?.list) {
//       // console.log('in-data');

//       setTableData(data.payload.list);
//     } // data

//     if (Object.prototype.toString.call(data) === "[object Array]") {
//       // console.log('this ----------------------------->', data);
//       setSocketMessage(data);
//     } // subscribe
//   };

//   useEffect(() => {
//     socket.addEventListener("open", fetchColumns);
//     socket.addEventListener("message", sendRequest);

//     return () => {
//       socket.removeEventListener("open", fetchColumns);
//       socket.removeEventListener("message", sendRequest);
//     };
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       const snapshotConifg: any = {
//         cmd: "snapshot",
//         id: requstId + 1,
//       }; // 快照 params config

//       const subscribeConifg: any = {
//         cmd: "subscribe",
//         id: requstId + 2,
//       }; // 推送 params config

//       if (filterRadio.join() !== "ALL") {
//         const otherConfig = {
//           type: "TOP_N",
//           n: 1000,
//           filter: {
//             contributorId: filterRadio.join(),
//           },
//         };

//         snapshotConifg.payload = otherConfig;
//         subscribeConifg.payload = otherConfig;
//       }

//       // console.log('snapshotConifg', snapshotConifg);
//       // console.log('subscribeConifg', subscribeConifg);

//       socket.send(JSON.stringify(snapshotConifg));
//       // socket.send(JSON.stringify(subscribeConifg));
//       setRequestId(requstId + 2);

//       return () => {
//         console.log("in-unmound");
//         const unsubscribeConifg = {
//           cmd: "unsubscribe",
//         }; // 推送 params config

//         // socket.send(JSON.stringify(unsubscribeConifg));
//       };
//     }
//   }, [filterRadio, isOpen]);

//   useEffect(() => {
//     dealData(socketMessage);
//   }, [socketMessage]);

//   const dealData = (message: any) => {
//     // console.log('dealData', message);

//     let newData: any[] = [...tableData];
//     message.forEach((item: any) => {
//       if (item.action === "ADD") {
//         newData = [...newData].concat([item.payload]);
//         // console.log("ADD", item.payload.msgSeq, newData.length);
//       }

//       if (item.action === "REMOVE") {
//         newData = [...newData].filter(
//           (i) =>
//             !(
//               i.contributorId === item.payload.contributorId &&
//               i.bondKey === item.payload.bondKey
//             )
//         );
//         // console.log("REMOVE", item.payload.msgSeq, newData.length);
//       }

//       if (item.action === "MODIFY") {
//         newData = [...newData].filter(
//           (i) =>
//             !(
//               i.contributorId === item.payload.contributorId &&
//               i.bondKey === item.payload.bondKey
//             )
//         );
//         newData = [...newData].concat([item.payload]);
//         // console.log("UPDATE", item.payload.msgSeq, newData.length);
//       }
//     });

//     newData = orderBy(newData, ["marketDataTm"], ["desc"]);

//     // console.log('newData', newData);
//     setTableData(newData);
//   };

//   // modal ---------------------------------------------------------

//   useEffect(() => {
//     if (!isModalVisible) {
//       const localData = localStorage.getItem("checkedConfig")?.split(",");
//       if (localData && localData.length > 0) {
//         const newColumns = columns.filter(
//           (item) => localData?.indexOf(item.key) !== -1
//         );
//         // console.log('newColumns', newColumns);
//         setTableColumns([...newColumns]);
//       }
//     }
//   }, [isModalVisible]);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     localStorage.setItem("checkedConfig", `${checkedKeys}`);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setCheckedKeys(localStorage.getItem("checkedConfig")?.split(",") || []);
//   };

//   const onCheckboxChange = (checkedValue: (string | number | boolean)[]) => {
//     setCheckedKeys(checkedValue);
//   };

//   const tableColumnsOptions =
//     modalList &&
//     modalList.map((item) => {
//       return {
//         label: <div style={{ width: 100 }}>{item.title}</div>,
//         value: item.key,
//       };
//     });

//   // -------------------------------------------------------------

//   const filterOptions = [
//     {
//       label: "国际(暂无)",
//       value: "CFIC",
//     },
//     {
//       label: "中诚(暂无)",
//       value: "CBBJ",
//     },
//     {
//       label: "平安",
//       value: "PATR",
//     },
//     {
//       label: "信唐",
//       value: "TJXT",
//     },
//     {
//       label: "国利(暂无)",
//       value: "TPSC",
//     },
//   ];

//   const onFilterChange = (
//     value: (string | number)[],
//     allValue?: (string | number)[]
//   ): void => {
//     // console.log('value, allValue', value, allValue);
//     setFilterRadio(value);
//   };

//   // -------------------------------------------------------------

//   return (
//     <div className={`ss-demo`}>
//       <div className="left">Left</div>
//       <div className="right">
//         <div className="config-box">
//           <div className="tool">
//             Tool:
//             <Icon className="config" type="setting" onClick={showModal} />
//           </div>

//           <div className="filter">
//             <Filter
//               options={filterOptions}
//               value={filterRadio}
//               onChange={onFilterChange}
//             />
//           </div>
//         </div>
//         <div className="top">
//           {tableColumns.length > 0 && (
//             <Table
//               rowKey={"msgSeq"}
//               columns={tableColumns || []}
//               dataSource={tableData || []}
//               height={"100%"}
//             />
//           )}
//         </div>
//         <div className="bottom">Bottom</div>
//       </div>

//       <Modal
//         title="表格设置"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={500}
//       >
//         <p>设置需要展示的列：</p>
//         {modalList && modalList.length > 0 && (
//           <Checkbox.Group
//             options={tableColumnsOptions}
//             value={
//               checkedKeys.length > 0
//                 ? checkedKeys
//                 : tableColumns.map((item) => item.key)
//             }
//             onChange={onCheckboxChange}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// };

// _ZZ_CustomTableComponent.storyName = "最优报价 demo";

// // ----------------------------------------------------------------
