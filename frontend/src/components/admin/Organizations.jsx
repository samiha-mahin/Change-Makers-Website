import useGetAllOrganizations from '@/hooks/useGetAllOrganizations'
import { setSearchOrganizationByText } from '@/redux/organizationSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import OrganizationsTable from './OrganizationsTable';

const Organizations = () => {
  useGetAllOrganizations();
  const [input,setInput]= useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchOrganizationByText(input));
  },[input]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex justify-between items-center my-5'>
          <Input
          className="w-fit"
          placeholder='Search Organization'
          onChange = {(e)=>setInput(e.target.value)}
          />
          <Button onClick={()=>navigate("/admin/organizations/create")} className="text-white bg-[#467057] hover:bg-[#2A4B37]">
            Register Organization
          </Button>
        </div>
        <OrganizationsTable/>
      </div>
    </div>
  )
}

export default Organizations