
import React, { useMemo } from 'react';

import { Chip } from '@mui/material';
import { useGetTransactionHistoryByIdQuery, useGetTransactionHistoryQuery } from '../redux/transactions/transactionModuleApi';
import DataTable from '../components/Table/DataTable';



const Transactions = ({id}) => {
  const { data = [], isLoading } = useGetTransactionHistoryByIdQuery(id);

  /* ===================== COLUMNS ===================== */
  const columns = useMemo(() => [
    {
      field: 'createdAt',
      headerName: 'Date',
      renderCell: value =>
        new Date(value).toLocaleString(),
      customSearchValue: row =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      field: 'orderId',
      headerName: 'Order ID',
    },
    //  {
    //   field: 'user',
    //   headerName: 'User Name',
    //   renderCell: (_, row) => row.user?.name || '—',
    //   customSearchValue: row => row.user?.name,
    // },
    // {
    //   field: 'user',
    //   headerName: 'User Email',
    //   renderCell: (_, row) => row.user?.email || '—',
    //   customSearchValue: row => row.user?.email,
    // },
    {
      field: 'coverage',
      headerName: 'Coverage',
    },
    {
      field: 'days',
      headerName: 'Days',
    },
    {
      field: 'dataGB',
      headerName: 'Data (GB)',
      renderCell: value => `${value} GB`,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      renderCell: value => `€ ${value}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: value => (
        <Chip
          size="small"
          label={value}
          color={value === 'ACTIVE' ? 'success' : 'warning'}
        />
      ),
    },
    {
      field: 'payment_method',
      headerName: 'Payment Method',
      renderCell: value => (
        <Chip
          size="small"
          label={value}
          color={value === 'ACTIVE' ? 'success' : 'warning'}
        />
      ),
    },
  ], []);

  /* ===================== ROWS ===================== */
  const rows = useMemo(() => {
    return data.map(item => {
      const order = item.order || {};

      return {
        id: item._id,                 // uniqueKey
        orderId: order._id,
        user: item.user,
        coverage: order?.destinations?.[0]?.name || 'N/A',
        days: order.days,
        dataGB: order.dataGB,
        amount: order.amount,
        status: order.planStatus,
        createdAt: item.createdAt,
      };
    });
  }, [data]);


  console.log("data :",data);
  return (
    <DataTable
      columns={columns}
      rows={rows}
      uniqueKey="id"
      search
      searchColumns={['orderId', 'coverage', 'status']}
      pagination
    />

   
  
  );
};

export default Transactions;
