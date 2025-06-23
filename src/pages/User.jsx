import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '../components/common/Table';
import BaseApiManager from '../networking/baseAPIManager';
import { API_ENDPOINTS } from '../networking/apiConfig';

const User = () => {
  const [userData, setUserData] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = response.users.map((user) => ({
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber || '---', 
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));

      setUserData(formatted);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Contact', accessor: 'phonenumber' }, 
    { Header: 'Role', accessor: 'role' },
    { Header: 'Created At', accessor: 'createdAt' },
  ];

  return (
    <div className="mt-8">
      <Table columns={columns} data={userData} title="All Users" />
    </div>
  );
};

export default User;
