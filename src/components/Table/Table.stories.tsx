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
