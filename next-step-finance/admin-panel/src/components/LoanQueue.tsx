import React from 'react';
import { Table, Button } from 'antd';
import useAdminApi from '../hooks/useAdminApi';

const columns = [
  { title: 'User', dataIndex: 'user' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Actions', render: (_, record) => <Button onClick={() => approveLoan(record._id)}>Approve</Button> }
];

export default function LoanQueue() {
  const { data: loans } = useAdminApi('/admin/loans'); // Assume endpoint

  const approveLoan = async (id) => {
    await useAdminApi(`/admin/loans/${id}/approve`, { method: 'POST' });
  };

  return <Table columns={columns} dataSource={loans} />;
}