/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
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

import Highlighter from "react-highlight-words";
import qs from "qs";

import {
  ColumnShowArgsTable,
  ExpandableShowArgsTable,
  PaginationShowArgsTable,
  RowSelectionShowArgsTable,
  SelectionItemShowArgsTable,
  TableLocaleShowArgsTable,
} from "./extendArgsTable";

import "./_story.scss";
import Table from "./index";

import {
  Select,
  Button,
  Input,
  Icon,
  FRCTableProps,
  ColumnsTypeProps,
  InputRef,
  FilterValue,
  SorterResult,
  PaginationConfig,
} from "../../index";

// import { Resizable } from "react-resizable";

const ImportCode = ({ code }: { code: string }) => (
  <Source dark language="ts" code={code.replace(/(\x20\x20)*/g, "")} />
);

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
          <ImportCode code={`import { Table } from 'frc-ui-pro';`} />
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
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000, y: 200 }}
    />
  );
};

Default.storyName = "默认 table";

// ----------------------------------------------------------------

export const _A_RowBgComponent = () => {
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

_A_RowBgComponent.storyName = "不同行背景 rowBgType";

// ----------------------------------------------------------------

// ----------------------------------------------------------------

export const _B_BorderComponent = () => {
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

_B_BorderComponent.storyName = "边框 border";

export const _C_NoDataComponent = () => {
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

_C_NoDataComponent.storyName = "暂无数据";

// ----------------------------------------------------------------

export const _D_LoadingComponent = () => {
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

_D_LoadingComponent.storyName = "加载中 loading";

// ----------------------------------------------------------------

export const _E_SizeComponent = () => {
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

_E_SizeComponent.storyName = "不同尺寸 size";

// ----------------------------------------------------------------

export const _F_HeaderSizeComponent = () => {
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

_F_HeaderSizeComponent.storyName = "不同尺寸 headerSize";

// ----------------------------------------------------------------

export const _G_FixledCloumnsComponent = () => {
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

_G_FixledCloumnsComponent.storyName = "固定列";

// ----------------------------------------------------------------

export const _H_SummaryComponent = () => {
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

_H_SummaryComponent.storyName = "总结栏/置顶拦";

// ----------------------------------------------------------------

export const _I_CustomCellTitleComponent = () => {
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

_I_CustomCellTitleComponent.storyName = "自定义单元格";

// ----------------------------------------------------------------

export const _J_ActiveComponent = () => {
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

_J_ActiveComponent.storyName = "激活选中 row";

// ----------------------------------------------------------------

export const _K_SelectComponent = () => {
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
  const rowSelection = {
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
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

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

_K_SelectComponent.storyName = "可选择";

// ----------------------------------------------------------------

export const _L_ControlSelectComponent = () => {
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys && selectedRowKeys.length > 0;

  // --------------------------------------------------------------

  const code = `
    // import code
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

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

_L_ControlSelectComponent.storyName = "选择和操作";

// ----------------------------------------------------------------

export const _M_CustomSelectComponent = () => {
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

  const rowSelection = {
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
    import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

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

_M_CustomSelectComponent.storyName = "自定义选择项";

// ----------------------------------------------------------------

export const _N_FilterAndSortComponent = () => {
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
        columns={columns}
        dataSource={data}
        onChange={onChange}
        locale={{ filterConfirm: "确定", filterReset: "重置" }}
      />
    </>
  );
};

_N_FilterAndSortComponent.storyName = "筛选和排序";

// ----------------------------------------------------------------

export const _O_MultipleSortComponent = () => {
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

_O_MultipleSortComponent.storyName = "多列排序";

// ----------------------------------------------------------------

export const _P_ControlFilterAndSelectComponent = () => {
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

_P_ControlFilterAndSelectComponent.storyName = "可控的筛选和排序";

// ----------------------------------------------------------------

export const _Q_ControlFilterAndSelectComponent = () => {
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

_Q_ControlFilterAndSelectComponent.storyName = "自定义筛选菜单";

// ----------------------------------------------------------------

export const _R_MockRequestComponent = () => {
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

_R_MockRequestComponent.storyName = "远程加载数据";

// ----------------------------------------------------------------

export const _S_HeaderAndFooterComponent = () => {
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

_S_HeaderAndFooterComponent.storyName = "页头/页脚";

// ----------------------------------------------------------------

export const _T_ExtendComponent = () => {
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

_T_ExtendComponent.storyName = "可展开";

// ----------------------------------------------------------------

export const _U_SpecialColSortComponent = () => {
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

_U_SpecialColSortComponent.storyName = "特殊列排序";

// ----------------------------------------------------------------

export const _V_CombineRowAndColComponent = () => {
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

_V_CombineRowAndColComponent.storyName = "表格行/列合并";

// // ----------------------------------------------------------------

// // 必须置于顶层，否则无法获取到 ref
// const ResizeableTitle = (props: any) => {
//   const { onResize, onResizeStart, onResizeStop, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       onResize={onResize}
//       onResizeStart={onResizeStart}
//       onResizeStop={onResizeStop}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// export const __DragBasicComponent = () => {
//   const [columns, setColumns] = useState([
//     {
//       title: "Date",
//       dataIndex: "date",
//       width: 200,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       width: 100,
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       width: 100,
//     },
//     {
//       title: "Note",
//       dataIndex: "note",
//       width: 100,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: () => <button>Delete</button>,
//     },
//   ]);

//   const components = {
//     header: {
//       cell: ResizeableTitle,
//     },
//   };

//   const data = [
//     {
//       key: 0,
//       date: "2018-02-11",
//       amount: 120,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 1,
//       date: "2018-03-11",
//       amount: 243,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 2,
//       date: "2018-04-11",
//       amount: 98,
//       type: "income",
//       note: "transfer",
//     },
//   ];

//   const handleResize =
//     (index: any) =>
//     (e: any, { size }: any) => {
//       // console.log("size", size);
//       const nextColumns = [...columns];
//       nextColumns[index] = {
//         ...nextColumns[index],
//         width: size.width,
//       };

//       setColumns(nextColumns);
//     };

//   let newColumns = columns.map(
//     (col, index) =>
//       ({
//         ...col,
//         onHeaderCell: (column: any) => ({
//           width: column.width,
//           onResize: handleResize(index),
//         }),
//       } as any)
//   );

//   return (
//     <Table
//       bordered
//       components={components}
//       columns={newColumns}
//       dataSource={data}
//     />
//   );
// };

// __DragBasicComponent.storyName = "基础拖拽 table";

// export const __DragComplexComponent = () => {
//   interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//     tags: string;
//     action: string;
//     sex: "male" | "female";
//     phone: number;
//     description: string;
//   }

//   const [tableColumns, setTableColumns] = useState<any[]>([
//     {
//       title: "Name",
//       dataIndex: "name",
//       fixed: "left",
//       width: "150px",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       width: "250px",
//     },
//     {
//       title: "Tags",
//       dataIndex: "tags",
//       width: "100px",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       width: "100px",
//     },
//     {
//       title: "Sex",
//       dataIndex: "sex",
//       width: "100px",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       width: "200px",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       fixed: "right",
//       width: "200px",
//     },
//   ]);

//   const components = {
//     header: {
//       cell: ResizeableTitle,
//     },
//   };

//   const handleResize =
//     (index: any) =>
//     (e: any, { size }: any) => {
//       const nextColumns = [...tableColumns];
//       nextColumns[index] = {
//         ...nextColumns[index],
//         width: size.width,
//       };
//       setTableColumns(nextColumns);
//     };

//   const handleResizeStart =
//     (index: any) =>
//     (e: any, { size }: any) => {
//       const nextColumns = [...tableColumns];
//       nextColumns[index] = {
//         ...nextColumns[index],
//         className: `${nextColumns[index].className || ""} frc-resizeable-start`,
//       };
//       setTableColumns(nextColumns);
//     };

//   const handleResizeStop =
//     (index: any) =>
//     (e: any, { size }: any) => {
//       const nextColumns = [...tableColumns];
//       nextColumns[index] = {
//         ...nextColumns[index],
//         className: nextColumns[index].className.replace(
//           / frc-resizeable-start/g,
//           ""
//         ),
//       };
//       setTableColumns(nextColumns);
//     };

//   let columnse: any[] = tableColumns.map((col, index) => ({
//     ...col,
//     onHeaderCell: (column: any) => ({
//       width: Number(column.width?.toString().match(/\d+/i)[0]),
//       onResizeStart: handleResizeStart(index),
//       onResize: handleResize(index),
//       onResizeStop: handleResizeStop(index),
//     }),
//   }));

//   const data: DataType[] = [
//     {
//       key: "1",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "2",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "3",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//     {
//       key: "4",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "5",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "6",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//     {
//       key: "7",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "8",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "9",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//     {
//       key: "10",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "11",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "12",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//     {
//       key: "13",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "14",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "15",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//     {
//       key: "16",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968711111,
//       description: "something else",
//     },
//     {
//       key: "17",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "male",
//       phone: 13968722222,
//       description: "something else",
//     },
//     {
//       key: "18",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       tags: "1",
//       action: "create",
//       sex: "female",
//       phone: 13968733333,
//       description: "something else",
//     },
//   ];

//   return (
//     <Table
//       bordered
//       components={components}
//       columns={columnse}
//       dataSource={data}
//       scroll={{ x: 900, y: 300 }}
//     />
//   );
// };

// __DragComplexComponent.storyName = "复杂拖拽 table";

// // ----------------------------------------------------------------
