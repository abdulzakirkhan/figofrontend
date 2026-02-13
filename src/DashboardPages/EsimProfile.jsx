import React, { useMemo } from 'react';

import DataTable from '../components/Table/DataTable';
import { useGetAllSubscribersQuery } from '../redux/subscribers/subscribersModuleApi';

const EsimProfile = () => {
  const { data = [], isLoading } = useGetAllSubscribersQuery();
  useGetAllSubscribersQuery

  const rows = useMemo(() => {
  return (data || []).map((sub, index) =>{
    const activePkg = sub.packages?.find(
      p => p.order?.planStatus === 'ACTIVE'
    );

    const pendingPkgs = sub.packages?.filter(
      p => p.order?.planStatus === 'PENDING'
    ) || [];

    return {
      id: sub._id,
      // userId:
        //  srNo: index + 1,
      subscriberId: sub.subscriberId,
      imsi: sub.imsiList?.[0]?.imsi || '-',
      iccid: sub.imsiList?.[0]?.iccid || '-',

      assignedUser: sub.assignedToUser
        ? sub.assignedToUser.email
        : 'Unassigned',

      simStatus: sub.sim?.status || '-',

      activePackage: activePkg
        ? `${activePkg.order.destinations?.[0]?.name} (${activePkg.order.days}D / ${activePkg.order.dataGB}GB)`
        : 'None',

      pendingPackages: pendingPkgs.map(p =>
        `${p.order.destinations?.[0]?.name} (${p.order.days}D)`
      ),

      pendingCount: pendingPkgs.length,

      totalPackages: sub.packages?.length || 0,

      phoneNumber: sub.phoneNumberList?.[0]?.phoneNumber || '-',

      activatedAt: sub.activationDate
        ? new Date(sub.activationDate).toLocaleDateString()
        : '-',

      lastUsage: sub.lastUsageDate
        ? new Date(sub.lastUsageDate).toLocaleDateString()
        : '-',
    };
  });
}, [data]);

const columns = [
  //  {
  //   field: 'srNo',
  //   headerName: '#',
  //   align: 'center',
  // },
  // { field: 'userId', headerName: 'User ID' },
  { field: 'subscriberId', headerName: 'Subscriber ID' },
  { field: 'imsi', headerName: 'IMSI' },
  { field: 'iccid', headerName: 'ICCID' },

  { field: 'assignedUser', headerName: 'Assigned To User' },

  {
    field: 'simStatus',
    headerName: 'SIM Status',
    renderCell: value => (
      <span style={{ color: value === 'AFFECTED' ? 'green' : 'red' }}>
        {value}
      </span>
    ),
  },

  {
    field: 'activePackage',
    headerName: 'Active Package',
  },

  {
    field: 'pendingPackages',
    headerName: 'Pending Packages',
    renderCell: value =>
      value.length ? (
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {value.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      ) : (
        'None'
      ),
  },

  { field: 'pendingCount', headerName: 'Pending Count' },
  { field: 'totalPackages', headerName: 'Total Packages' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'activatedAt', headerName: 'Activation Date' },
  { field: 'lastUsage', headerName: 'Last Connection' },
];



  if (isLoading) return <div>Loading...</div>;

  return (

    <DataTable
  rows={rows}
  columns={columns}
  uniqueKey="id"
  search
  pagination
  searchColumns={[
    'subscriberId',
    'imsi',
    'iccid',
    'assignedUser',
    'activePackage',
  ]}
/>


  );
};

export default EsimProfile;
