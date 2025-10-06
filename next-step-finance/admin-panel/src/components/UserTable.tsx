import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useAdminApi from '../hooks/useAdminApi';

const columns = [
  { title: 'Name', dataIndex: 'firstName' },
  { title: 'Phone', dataIndex: 'phone' },
  { title: 'Level', dataIndex: 'level' },
  { title: 'Balance', dataIndex: 'balance', render: (v) => `$${v}` },
  { title: 'Actions', render: (_, record) => <Button onClick={() => updateBalance(record._id)}>Add Money</Button> }
];

export default function UserTable() {
  const { data: users, refetch } = useAdminApi('/admin/users');
  const [loading, setLoading] = useState(false);

  const updateBalance = async (id) => {
    setLoading(true);
    await useAdminApi(`/admin/users/${id}/balance`, { method: 'PUT', data: { amount: 100 } });
    refetch();
    setLoading(false);
  };

  return <Table columns={columns} dataSource={users} loading={loading} />;
}