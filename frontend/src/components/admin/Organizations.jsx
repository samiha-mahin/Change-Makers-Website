import useGetAllOrganizations from '@/hooks/useGetAllOrganizations';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import OrganizationsTable from './OrganizationsTable';

const Organizations = () => {
  useGetAllOrganizations();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { organizations } = useSelector((store) => store.organization);

  // Filter logic happens here
  const filteredOrganizations = organizations.filter((organization) => {
    if (!input) return true;
    return organization?.name?.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex justify-between items-center my-5">
          <Input
            className="w-fit"
            placeholder="Search Organization"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/organizations/create')}
            className="text-white bg-[#467057] hover:bg-[#2A4B37]"
          >
            Register Organization
          </Button>
        </div>
        <OrganizationsTable organizations={filteredOrganizations} />
      </div>
    </div>
  );
};

export default Organizations;
