"use client";

import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Modal, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { ORIGIN_LANGUAGE, TARGET_LANGUAGE } from '../constant';

const columns: TableProps<Schema['Task']['type']>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Origin Language',
    dataIndex: 'originLanguage',
    key: 'originLanguage',
  },
  {
    title: 'Target Language',
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
  }
];

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TaskList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Array<Schema["Task"]["type"]>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    listTasks();
  }, []);

  const listTasks = () => {
    client.models.Task.observeQuery().subscribe({
      next: (data) => setTasks([...data.items]),
    });
  }

  const handleAddTask = () => {
    form.validateFields().then((values) => {
      client.models.Task.create({
        originLanguage: values.originLanguage,
        targetLanguage: values.targetLanguage,
        note: values.note,
      });
      setIsModalOpen(false);
      form.resetFields();
    });
  }

  const handleOnRowClick: TableProps<Schema['Task']['type']>["onRow"] = (record) => ({
    onClick: () => {
      router.push(`/gen-ui/tasks/${record.id}`);
    }
  });

  return <div className="flex flex-col gap-4">
    <Flex justify="space-between" gap={12}>
      <Input placeholder="Search by task name" />
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Add task</Button>
    </Flex>
    
    <Table<Schema['Task']['type']> columns={columns} dataSource={tasks} rowKey={(record) => record.id} onRow={handleOnRowClick}/>

    <Modal 
      title="Add task" 
      open={isModalOpen} 
      onCancel={() => setIsModalOpen(false)} 
      onOk={() => handleAddTask()}
    >
      <Form form={form}>
        <Form.Item 
          label="Origin Language" 
          name="originLanguage"
          rules={[{ required: true, message: 'Please select origin language' }]}
        >
          <Select placeholder="Select origin language">
            {Object.entries(ORIGIN_LANGUAGE).map(([key, value]) => (
              <Select.Option key={key} value={value}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
          label="Target Language" 
          name="targetLanguage"
          rules={[{ required: true, message: 'Please select target language' }]}
        >
          <Select placeholder="Select target language">
            {Object.entries(TARGET_LANGUAGE).map(([key, value]) => (
              <Select.Option key={key} value={value}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input placeholder="Enter note" />
        </Form.Item>
      </Form>
    </Modal>
  </div>
}
