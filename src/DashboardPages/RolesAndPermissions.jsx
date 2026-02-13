import React from 'react'
import CustomTabs from '../components/CustomTabs';
import UserTab from './UserTab';
import AssignPermissionTab from './AssignPermissionTab';
import RolesTab from './RolesTab';
import MenusTab from './MenusTab';

export const RolesAndPermissions = () => {
  const tabs = ["User", "Assign Permission", "Roles", "Menus"];
  const panels = [
    <UserTab key="user" />,
    <AssignPermissionTab key="permission" />,
    <RolesTab key="roles" />,
    <MenusTab key="menus" />,
  ];

  return (
    <div className='m-3'>
      <p className='text-2xl'>Roles & Permission</p>
      <CustomTabs tabs={tabs} panels={panels} />
    </div>
  )
}
