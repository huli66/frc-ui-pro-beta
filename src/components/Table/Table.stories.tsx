// import { useState } from "react";
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
} from "@storybook/addon-docs";

import { FRCTableProps, ColumnsTypeProps } from "./table";
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

import { Select } from "../../index";

// import { Resizable } from "react-resizable";

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Table } from 'frc-ui-pro';
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
  title: "数据显示/Table表格",
  component: Table,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>展示行列数据。</Description>
          <ImportComponent />
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

export const _A_FixledCloumnsComponent = () => {
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

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sortOrder: true,
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      sortOrder: true,
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sortOrder: true,
      width: "300px",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      sortOrder: true,
      width: "200px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      sortOrder: true,
      width: "200px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      sortOrder: true,
      width: "200px",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      sortOrder: true,
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 900, y: 200 }}
      pagination={false}
    />
  );
};

_A_FixledCloumnsComponent.storyName = "固定列";

// ----------------------------------------------------------------

export const _B_SummaryComponent = () => {
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
    <>
      用 summary 实现: 表格的 “总结栏” or “置顶功能”
      <br />
      (tips: “总结栏” 与 “置顶功能”。一个表格中，仅能存在二者其中一个)
      <br />
      <Table
        columns={columns}
        dataSource={data}
        summary={() => {
          return (
            <Table.Summary fixed="top">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top1</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top2</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>end</Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>top3</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  This is a summary content
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>end</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
        scroll={{ x: 1000, y: 200 }}
      />
    </>
  );
};

_B_SummaryComponent.storyName = "总结栏/置顶拦";

// ----------------------------------------------------------------

export const _C_NoDataComponent = () => {
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

  return (
    <Table columns={columns} dataSource={[]} locale={{ emptyHeight: 300 }} />
  );
};

_C_NoDataComponent.storyName = "暂无数据";

// ----------------------------------------------------------------

export const _D_CustomCellTitleComponent = () => {
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
          boxStyle={{ width: "100%" }}
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
          boxStyle={{ width: "100%" }}
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

  return (
    <>
      例：配合 Select 组件，实现表格 “单元格” 的自定义： “头部选择”、“数据选择”
      <br />
      <Table
        columns={columns}
        dataSource={data}
        locale={{ emptyHeight: 300 }}
      />
    </>
  );
};

_D_CustomCellTitleComponent.storyName = "自定义单元格";

// ----------------------------------------------------------------

export const _D_RowBgComponent = () => {
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
    <>
      default
      <Table rowBgType="default" columns={columns} dataSource={data} />
      <Table
        rowBgType="default"
        columns={columns}
        dataSource={[]}
        locale={{ emptyHeight: 200 }}
      />
      <br />
      cross
      <Table rowBgType="cross" columns={columns} dataSource={data} />
      <Table
        rowBgType="cross"
        columns={columns}
        dataSource={[]}
        locale={{ emptyHeight: 200 }}
      />
    </>
  );
};

_D_RowBgComponent.storyName = "不同行背景 rowBgType";

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
