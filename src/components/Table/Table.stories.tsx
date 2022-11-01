/* eslint-disable react-hooks/exhaustive-deps */
import orderBy from "lodash/orderBy";
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

//// ----------------------------------------------------------------

// export const Default = () => {
//   interface DataType {
//     key: number;
//     name: string;
//     age: string;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
//     key: key,
//     name: `name-${key}`,
//     age: `age-${key}`,
//     address: `address-${key}`,
//   }));

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

//     // 基于 虚拟滚动 的表格
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table columns={columns} dataSource={data} />
//     </>
//   );
// };

// Default.storyName = "默认 table";

// // ----------------------------------------------------------------

// export const _AA_RowBgComponent = () => {
//   interface DataType {
//     key: number;
//     name: string;
//     age: string;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
//     key: key,
//     name: `name-${key}`,
//     age: `age-${key}`,
//     address: `address-${key}`,
//   }));

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       default
//       <Table rowBgType="default" columns={columns} dataSource={data} />
//       <br />
//       cross
//       <Table rowBgType="cross" columns={columns} dataSource={data} />
//     </>
//   );
// };

// _AA_RowBgComponent.storyName = "不同行背景 rowBgType";

// // ----------------------------------------------------------------

// export const _AB_BorderComponent = () => {
//   interface DataType {
//     key: number;
//     name: string;
//     age: string;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
//     key: key,
//     name: `name-${key}`,
//     age: `age-${key}`,
//     address: `address-${key}`,
//   }));

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       default
//       <Table bordered rowBgType="default" columns={columns} dataSource={data} />
//       <br />
//       cross
//       <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
//     </>
//   );
// };

// _AB_BorderComponent.storyName = "边框 border";

// // ----------------------------------------------------------------

// export const _AC_NoDataComponent = () => {
//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

//     // 根据 height 属性，自动计算出 empty 表格的高度
//     // height 属性，默认为 300
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       default
//       <Table
//         rowBgType="default"
//         columns={columns}
//         dataSource={[]}
//         height="256px"
//       />
//       <br />
//       cross
//       <Table
//         rowBgType="cross"
//         columns={columns}
//         dataSource={[]}
//         height="256px"
//       />
//     </>
//   );
// };

// _AC_NoDataComponent.storyName = "暂无数据";

// // ----------------------------------------------------------------

// export const _AD_LoadingComponent = () => {
//   interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//   ];

//   const data: DataType[] = [
//     {
//       key: "1",
//       name: "John Brown1",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//     },
//     {
//       key: "2",
//       name: "Jim Green2",
//       age: 42,
//       address: "London No. 1 Lake Park",
//     },
//     {
//       key: "3",
//       name: "Joe Black3",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "4",
//       name: "Joe Black4",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "5",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "6",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "7",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "8",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "9",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "10",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//     {
//       key: "11",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//     },
//   ];

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table columns={columns} dataSource={data} loading />
//     </>
//   );
// };

// _AD_LoadingComponent.storyName = "加载中 loading";

// // ----------------------------------------------------------------

// export const _AE_SizeComponent = () => {
//   interface DataType {
//     key: number;
//     name: string;
//     age: string;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
//     key: key,
//     name: `name-${key}`,
//     age: `age-${key}`,
//     address: `address-${key}`,
//   }));

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       small{" => "}is default
//       <Table size="small" columns={columns} dataSource={data} />
//       <Table size="small" columns={columns} dataSource={[]} />
//       <Table
//         size="small"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//       <Table size="small" rowBgType="cross" columns={columns} dataSource={[]} />
//       <br />
//       middle
//       <Table size="middle" columns={columns} dataSource={data} />
//       <Table size="middle" columns={columns} dataSource={[]} />
//       <Table
//         size="middle"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         size="middle"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={[]}
//       />
//       <br />
//       large
//       <Table bordered size="large" columns={columns} dataSource={data} />
//       <Table bordered size="large" columns={columns} dataSource={[]} />
//       <Table
//         bordered
//         size="large"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         bordered
//         size="large"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={[]}
//       />
//     </>
//   );
// };

// _AE_SizeComponent.storyName = "不同尺寸 size";

// // ----------------------------------------------------------------

// // ----------------------------------------------------------------

// export const _AF_HeaderSizeComponent = () => {
//   interface DataType {
//     key: number;
//     name: string;
//     age: string;
//     address: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 300,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: 300,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 500,
//     },
//   ];

//   const data: DataType[] = Array.from({ length: 100 }, (_, key) => ({
//     key: key,
//     name: `name-${key}`,
//     age: `age-${key}`,
//     address: `address-${key}`,
//   }));

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       small{" => "}is default
//       <Table bordered headerSize="small" columns={columns} dataSource={data} />
//       <Table
//         bordered
//         headerSize="small"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//       <br />
//       middle
//       <Table bordered headerSize="middle" columns={columns} dataSource={data} />
//       <Table
//         bordered
//         headerSize="middle"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//       <br />
//       large
//       <Table bordered headerSize="large" columns={columns} dataSource={data} />
//       <Table
//         bordered
//         headerSize="large"
//         rowBgType="cross"
//         columns={columns}
//         dataSource={data}
//       />
//     </>
//   );
// };

// _AF_HeaderSizeComponent.storyName = "不同尺寸 headerSize";

// // ----------------------------------------------------------------

// export const _AG_FixledCloumnsComponent = () => {
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

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       // fixed: "left",
//       width: "80px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: "200px",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       width: "50px",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       width: "100px",
//     },
//     {
//       title: "Sex",
//       dataIndex: "sex",
//       key: "sex",
//       width: "100px",
//     },
//     {
//       title: "Phone",
//       key: "phone",
//       dataIndex: "phone",
//       width: "200px",
//       fixed: "right",
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//       width: "200px",
//       fixed: "right",
//     },
//   ];

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

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table bordered columns={columns} dataSource={data} />
//       <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
//       <Table bordered size="middle" columns={columns} dataSource={data} />
//       <Table bordered size="large" columns={columns} dataSource={data} />
//     </>
//   );
// };

// _AG_FixledCloumnsComponent.storyName = "固定列";

// // ----------------------------------------------------------------

// export const _AH_SummaryComponent = () => {
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

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       width: "150px",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       fixed: "left",
//       width: "50px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: "200px",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       width: "50px",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       width: "100px",
//     },
//     {
//       title: "Sex",
//       dataIndex: "sex",
//       key: "sex",
//       width: "80px",
//     },
//     {
//       title: "Phone",
//       key: "phone",
//       dataIndex: "phone",
//       width: "200px",
//       fixed: "right",
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//       width: "200px",
//       fixed: "right",
//     },
//   ];

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

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

//     // 用 summary 实现: 表格的 “总结栏” or “置顶功能”。
//     // (tips: “总结栏” 与 “置顶功能”。一个表格中，仅能存在二者其中一个)
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table
//         bordered
//         columns={columns}
//         dataSource={data}
//         summary={() => {
//           return (
//             <Table.Summary fixed="top">
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top1</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top3</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//             </Table.Summary>
//           );
//         }}
//       />

//       <Table
//         bordered
//         columns={columns}
//         dataSource={data}
//         summary={() => {
//           return (
//             <Table.Summary fixed="bottom">
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top1</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0}>top3</Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>2</Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   This is a summary content
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>5</Table.Summary.Cell>
//                 <Table.Summary.Cell index={4}>6</Table.Summary.Cell>
//                 <Table.Summary.Cell index={5}>7</Table.Summary.Cell>
//                 <Table.Summary.Cell index={6}>8</Table.Summary.Cell>
//                 <Table.Summary.Cell index={7}>end</Table.Summary.Cell>
//               </Table.Summary.Row>
//             </Table.Summary>
//           );
//         }}
//       />
//     </>
//   );
// };

// _AH_SummaryComponent.storyName = "总结栏/置顶拦";

// // ----------------------------------------------------------------

// export const _AI_CustomCellTitleComponent = () => {
//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 350,
//     },
//     {
//       title: (
//         <Select
//           defaultValue="day"
//           type="no-border"
//           style={{
//             width: "calc(100% + 12px)",
//             marginLeft: "-6px",
//             marginRight: "-6px",
//           }}
//           wrapperStyle={{ width: "100%" }}
//         >
//           <Select.Option value="day">Day </Select.Option>
//           <Select.Option value="week">Week </Select.Option>
//           <Select.Option value="month">Month </Select.Option>
//           <Select.Option value="year">Year </Select.Option>
//         </Select>
//       ),
//       dataIndex: "interval",
//       key: "interval",
//       width: 350,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 350,
//     },
//   ];

//   const data: any[] = Array.from({ length: 30 }, (_, key) => ({
//     key: key.toString(),
//     name: `name-${key}`,
//     interval: (
//       <Select
//         defaultValue="2022-01-01"
//         type="no-border"
//         style={{
//           width: "calc(100% + 10px)",
//           marginLeft: "-5px",
//           marginRight: "-5px",
//         }}
//         wrapperStyle={{ width: "100%" }}
//       >
//         <Select.Option value="2022-01-01">2022-01-01 </Select.Option>
//         <Select.Option value="2022-01-02">2022-01-02 </Select.Option>
//         <Select.Option value="2022-01-03">2022-01-03 </Select.Option>
//         <Select.Option value="2022-01-04">2022-01-04 </Select.Option>
//       </Select>
//     ),
//     address: `address-${key}`,
//   }));
//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";

//     // 例：配合 Select 组件，实现表格 “单元格” 的自定义： “头部选择”、“数据选择”
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table bordered columns={columns} dataSource={data} />
//       <Table bordered rowBgType="cross" columns={columns} dataSource={data} />
//     </>
//   );
// };

// _AI_CustomCellTitleComponent.storyName = "自定义单元格";

// // ----------------------------------------------------------------

// export const _AJ_ActiveComponent = () => {
//   const [activeItem, setActiveItem] = useState<string | number | undefined>();
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

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       width: "150px",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: "200px",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       width: "50px",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       width: "80px",
//     },
//     {
//       title: "Sex",
//       dataIndex: "sex",
//       key: "sex",
//       width: "80px",
//     },
//     {
//       title: "Phone",
//       key: "phone",
//       dataIndex: "phone",
//       width: "200px",
//       fixed: "right",
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//       width: "200px",
//       fixed: "right",
//     },
//   ];

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

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps } from "frc-ui-pro/components/Table/table";
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table
//         bordered
//         columns={columns}
//         dataSource={data}
//         rowActive={activeItem}
//         onRow={(record) => {
//           return {
//             onClick: () => {
//               setActiveItem(record.key);
//             }, // 点击行
//           };
//         }}
//       />
//     </>
//   );
// };

// _AJ_ActiveComponent.storyName = "激活选中 row";

// // ----------------------------------------------------------------

// export const _AK_SelectComponent = () => {
//   interface DataType {
//     key?: string;
//     name?: string;
//     age?: number;
//     address?: string;
//     tags?: string;
//     action?: string;
//     sex?: "male" | "female";
//     phone?: number;
//     description?: string;
//   }

//   const columns: ColumnsTypeProps[] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       width: "150px",
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       fixed: "left",
//       width: "100px",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: "200px",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       width: "50px",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       width: "100px",
//     },
//     {
//       title: "Sex",
//       dataIndex: "sex",
//       key: "sex",
//       width: "80px",
//     },
//     {
//       title: "Phone",
//       key: "phone",
//       dataIndex: "phone",
//       width: "100px",
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//       width: "300px",
//       fixed: "right",
//     },
//   ];

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

//     {
//       key: "19",
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
//       key: "20",
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
//       key: "21",
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
//       key: "22",
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
//       key: "23",
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
//       key: "24",
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
//       key: "25",
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
//       key: "26",
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
//       key: "27",
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
//       key: "28",
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
//       key: "29",
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
//       key: "30",
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
//       key: "31",
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
//       key: "32",
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
//       key: "33",
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
//       key: "34",
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
//       key: "35",
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
//       key: "36",
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

//   // rowSelection object indicates the need for row selection
//   const rowSelection: RowSelectionProps = {
//     onChange: (selectedRowKeys?: React.Key[], selectedRows?: DataType[]) => {
//       console.log(
//         `selectedRowKeys: ${selectedRowKeys}`,
//         "selectedRows: ",
//         selectedRows
//       );
//     },
//     getCheckboxProps: (record: DataType) => ({
//       disabled: record.name === "Disabled User", // Column configuration not to be checked
//       name: record.name,
//     }),
//   };

//   // --------------------------------------------------------------

//   const code = `
//     // import code
//     import { ColumnsTypeProps, RowSelectionProps } from "frc-ui-pro/components/Table/table";

//     // 第一列是联动的选择框。可以通过 rowSelection.type 属性指定选择类型，默认为checkbox。
//   `;

//   // --------------------------------------------------------------

//   return (
//     <>
//       <ImportCode code={code} />
//       <Table
//         bordered
//         rowSelection={{
//           type: "checkbox",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         bordered
//         size="middle"
//         rowSelection={{
//           type: "checkbox",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         bordered
//         rowBgType="cross"
//         rowSelection={{
//           type: "checkbox",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         bordered
//         rowSelection={{
//           type: "radio",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//       <Table
//         bordered
//         rowBgType="cross"
//         rowSelection={{
//           type: "radio",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//     </>
//   );
// };

// _AK_SelectComponent.storyName = "可选择";

// // ----------------------------------------------------------------

export const _BL_MessageTipComponent = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    description: string;
    animeKey?: string | number;
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
    {
      key: "11",
      name: "John Brown123",
      age: 32,
      address: "New York No. 1 Lake Park123",
      description: "something else123",
    },
    {
      key: "12",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "13",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "14",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "15",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "16",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "17",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "18",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "19",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description: "something else",
    },
    {
      key: "20",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "something else",
    },
  ]);
  const [activeRowKey, setActiveRowKey] = useState<string>();

  // mock update data ---------------------------------------------

  useEffect(() => {
    setInterval(() => {
      setData((pre) => {
        const dataMock: DataType[] = [
          {
            key: pre.length + 1 + "",
            name: "新推送：" + (pre.length + 1),
            age: 42,
            address: "London No. 1 Lake Park",
            description: "something else",
            animeKey: pre.length + 1 + "", // 用于动画
          },
        ];

        return [...dataMock].concat([...pre]);
      });
    }, 4000);
  }, []);

  // --------------------------------------------------------------

  const columns: ColumnsTypeProps[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "300px",
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
      width: "300px",
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
    // rowActiveFirstGradient 启动 “数据” 渐变效果 (每次 data change, 都会触发)
    // animeRowKey 为 “数据” 渐变效果的 key。(!!!: 有推送时，处理 item 时自行添加 animeRowKey, 否则无效)
  `;

  // --------------------------------------------------------------

  return (
    <>
      <ImportCode code={code} />
      <Table
        animeRowKey="animeKey"
        columns={columns}
        dataSource={data}
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

// ----------------------------------------------------------------

export const _ZZ_CustomTableComponent = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [test, setTest] = useState<boolean>(false);
  const [socketMessage, setSocketMessage] = useState<any[]>([]);

  const columns: any[] = [
    {
      title: "剩余期限",
      dataIndex: "residualMaturity",
      key: "residualMaturity",
      // fixed: 'left',
      width: "100px",
    },
    {
      title: "债券简称",
      dataIndex: "bondNm",
      key: "bondNm",
      width: "400px",
    },
    {
      title: "票面利率",
      dataIndex: "couponRt",
      key: "couponRt",
      width: "100px",
    },
    {
      title: "主体评级",
      dataIndex: "instRt",
      key: "instRt",
      width: "100px",
    },
    {
      title: "债项评级",
      dataIndex: "bondRt",
      key: "bondRt",
      width: "100px",
    },
    {
      title: "展望评级",
      dataIndex: "brokerOfrFwdYld",
      key: "brokerOfrFwdYld",
      width: "100px",
    },
    {
      title: "含权类型",
      dataIndex: "optEmbeddedTyp",
      key: "optEmbeddedTyp",
      width: "100px",
    },
    {
      title: "行权日",
      dataIndex: "strikeDt",
      key: "strikeDt",
      width: "100px",
    },
    {
      title: "到期日",
      dataIndex: "maturityDt",
      key: "maturityDt",
      width: "100px",
    },
    {
      title: "跨市场",
      dataIndex: "bnkFlg",
      key: "bnkFlg",
      width: "100px",
    },
    {
      title: "债券余额(亿)",
      dataIndex: "outstandingAmt",
      key: "outstandingAmt",
      width: "100px",
    },
    {
      title: "产品",
      dataIndex: "securitySubTyp",
      key: "securitySubTyp",
      width: "100px",
    },
    {
      title: "经纪商",
      dataIndex: "contributorId",
      key: "contributorId",
      width: "100px",
    },
    {
      title: "最后更新",
      dataIndex: "marketDataTm",
      key: "marketDataTm",
      width: "200px",
    },
    {
      title: "Vol.Bid",
      dataIndex: "bidVol",
      key: "bidVol",
      width: "100px",
    },
    {
      title: "Bid参考净价",
      dataIndex: "bidPrc",
      key: "bidPrc",
      width: "100px",
    },
    {
      title: "Bid",
      dataIndex: "bidPx",
      key: "bidPx",
      width: "100px",
    },
    {
      title: "Ofr",
      dataIndex: "ofrPx",
      key: "ofrPx",
      width: "100px",
    },
    {
      title: "Ofr参考净价",
      dataIndex: "askPrc",
      key: "askPrc",
      width: "100px",
    },
    {
      title: "Vol.Ofr",
      dataIndex: "askVol",
      key: "askVol",
      width: "100px",
    },
    {
      title: "中债估值到期",
      dataIndex: "valuation1",
      key: "valuation1",
      width: "100px",
    },
    {
      title: "中债估值行权",
      dataIndex: "valuation5",
      key: "valuation5",
      width: "100px",
    },
    {
      title: "中证估值到期",
      dataIndex: "valuation2",
      key: "valuation2",
      width: "100px",
    },
    {
      title: "中证估值行权",
      dataIndex: "valuation6",
      key: "valuation6",
      width: "100px",
    },
    {
      title: "bid-中债(BP)",
      dataIndex: "bidSpread1",
      key: "bidSpread1",
      width: "100px",
    },
    {
      title: "中债-Ofr(BP)",
      dataIndex: "askSpread1",
      key: "askSpread1",
      width: "100px",
    },
    {
      title: "bid-中证(BP)",
      dataIndex: "bidSpread2",
      key: "bidSpread2",
      width: "100px",
    },
    {
      title: "中证-Ofr(BP)",
      dataIndex: "askSpread2",
      key: "askSpread2",
      width: "100px",
    },
    {
      title: "Bid报价状态",
      dataIndex: "bidQuoteSts",
      key: "bidQuoteSts",
      width: "100px",
    },
    {
      title: "Ask报价状态",
      dataIndex: "askQuoteSts",
      key: "askQuoteSts",
      width: "100px",
    },
    {
      title: "消息序号",
      dataIndex: "msgSeq",
      key: "msgSeq",
      width: "300px",
    },
    {
      title: "Bid编号",
      dataIndex: "bidQuoteId",
      key: "bidQuoteId",
      width: "300px",
    },
    {
      title: "Ask编号",
      dataIndex: "askQuoteId",
      key: "askQuoteId",
      width: "300px",
    },
  ];

  const open = (socket: any, event: any) => {
    // console.log("open");
    socket.send('{"cmd":"snapshot"}');
    // socket.send('{"cmd":"subscribe"}');
  };

  const sendRequest = (socket: any, event: any) => {
    const data: any = JSON.parse(event.data);

    // console.log("data", data);

    if (data?.payload?.list && !test) {
      setTableData(data.payload.list);
      setTest(true);
    }

    if (Object.prototype.toString.call(data) === "[object Array]") {
      setSocketMessage(data);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://172.16.74.20:8088");

    // console.log("socket", socket);

    const openBox = open.bind(this, socket);
    const sendRequestBox = sendRequest.bind(this, socket);

    socket.addEventListener("open", openBox);
    socket.addEventListener("message", sendRequestBox);

    return () => {
      socket.removeEventListener("open", openBox);
      socket.removeEventListener("message", sendRequestBox);
    };
  }, []);

  useEffect(() => {
    dealData(socketMessage);
  }, [socketMessage]);

  const dealData = (message: any) => {
    // console.log('dealData', message);
    let newData: any[] = [...tableData];
    message.forEach((item: any) => {
      if (item.action === "ADD") {
        newData = [...newData].concat([item.payload]);
        // console.log('ADD', item.payload.msgSeq, newData.length);
      }

      if (item.action === "REMOVE") {
        newData = [...newData].filter(
          (i) =>
            !(
              i.contributorId === item.payload.contributorId &&
              i.bondKey === item.payload.bondKey
            )
        );
        // console.log('REMOVE', item.payload.msgSeq, newData.length);
      }

      if (item.action === "UPDATE") {
        newData = [...newData].filter(
          (i) =>
            !(
              i.contributorId === item.payload.contributorId &&
              i.bondKey === item.payload.bondKey
            )
        );
        newData = [...newData].concat([item.payload]);
        // console.log('UPDATE', item.payload.msgSeq, newData.length);
      }
    });

    newData = orderBy(newData, ["marketDataTm"], ["desc"]);
    setTableData(newData);
  };

  return (
    <>
      <Table
        bordered
        rowKey={(record) => {
          return record.msgSeq;
        }}
        columns={columns}
        dataSource={tableData || []}
      />
    </>
  );
};

_ZZ_CustomTableComponent.storyName = "最优报价 demo";

// ----------------------------------------------------------------
