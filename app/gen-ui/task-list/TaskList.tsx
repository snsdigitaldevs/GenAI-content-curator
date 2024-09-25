
import React from 'react';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  id: string;
  originLanguage: string;
  targetLanguage: string;
  note: string;
  status: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'OriginLanguage',
    dataIndex: 'originLanguage',
    key: 'originLanguage',
  },
  {
    title: 'TargetLanguage',
    dataIndex: 'targetLanguage',
    key: 'targetLanguage',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    originLanguage: "English",
    targetLanguage: "Chinese",
    note: "test test test test test test test test test test test test",
    status: "Pending",
  },
  {
    id: "2",
    originLanguage: "English",
    targetLanguage: "Chinese",
    note: "test test test test test test test test test test test test",
    status: "Pending",
  },
  {
    id: "3",
    originLanguage: "English",
    targetLanguage: "Chinese",
    note: "test test test test test test test test test test test test",
    status: "Pending",
  }
];
export default function TaskList() {
  return <div className="flex flex-col gap-4">
    <Flex justify="space-between" gap={12}>
      <Input placeholder="Search by task name" />
      <Button>Add task</Button>
    </Flex>
    <Table<DataType> columns={columns} dataSource={data} />
  </div>
}
