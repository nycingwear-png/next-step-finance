import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import useAdminApi from '../hooks/useAdminApi';

export default function AddFundsForm({ userId }) {
  const [form] = Form.useForm();
  const { mutate } = useAdminApi(`/admin/users/${userId}/balance`, { method: 'PUT' });

  const onFinish = (values) => {
    mutate({ amount: parseFloat(values.amount) });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="amount" label="Amount">
        <Input type="number" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Add Funds</Button>
    </Form>
  );
}