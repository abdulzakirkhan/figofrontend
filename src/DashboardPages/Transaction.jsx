import React, { useMemo } from 'react';

import { Chip } from '@mui/material';
import { useGetTransactionHistoryQuery } from '../redux/transactions/transactionModuleApi';
import DataTable from '../components/Table/DataTable';
import AppLoader from '../components/Loader/AppLoader';


const Transaction = () => {
  const { data = [], isLoading } = useGetTransactionHistoryQuery();
 

  /* ===================== COLUMNS ===================== */
  const columns = useMemo(() => [
    {
      field: 'userId',
      headerName: 'User ID',
    },
    {
      field: 'subId',
      headerName: 'Subscriber ID',
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
      headerName: 'Duration',
    },
    {
      field: 'dataGB',
      headerName: 'Data (GB)',
      renderCell: value => `${value} GB`,
    },
    {
      field: 'amount',
      headerName: 'Amount ∈',
      renderCell: value => `€ ${value}`,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
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
      field: 'createdAt',
      headerName: 'Date',
      renderCell: value =>
        new Date(value).toLocaleString(),
      customSearchValue: row =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      field: 'pdf',
      headerName: 'PDF',
      renderCell: value => `€ ${value}`,
    },
  ], []);

  /* ===================== ROWS ===================== */
  const rows = useMemo(() => {
    return data.map(item => {
      const order = item.order || {};

      return {
        paymentMethod: order?.paymentMethod,
        subId: item?.user?.subscriber,
        userId: item?.user?._id,
        id: item._id,                 // uniqueKey
        orderId: order._id,
        user: item.user,
        coverage: order?.destinations?.[0]?.name || 'N/A',
        days: order.days,
        dataGB: order.dataGB,
        amount: order.amount,
        status: order.planStatus,
        createdAt: item.createdAt,
        pdf:"iii"
      };
    });
  }, [data]);



    if (isLoading) return <AppLoader fullPage />;
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

export default Transaction;