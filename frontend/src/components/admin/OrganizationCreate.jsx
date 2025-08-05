import { setSingleOrganization } from '@/redux/organizationSlice';
import { ORGANIZATION_API } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const OrganizationCreate = () => {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState();
  const dispatch = useDispatch();
  const registerNewOrganization = async () => {
    try {
      const res = await axios.post(`${ORGANIZATION_API}/register`,{organizationName},{
        headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
      });
      if(res?.data?.success){
        dispatch(setSingleOrganization(res.data.organization));
      }
      toast.success(res.data.message);
      const organizationId = res?.data?.organization?._id;
      navigate(`/admin/organizations/${organizationId}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto p-4 sm:px-6'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Organization Name</h1>
          <p className='text-gray-500'>You can change this later</p>
        </div>
        <Label>Organization Name</Label>
        <Input
        type = "text"
        className='my-2'
        placeholder='Enter your organization name'
        onChange={(e) => setOrganizationName(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 my-10">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/organizations')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewOrganization}
            className="text-white bg-[#467057] hover:bg-[#2A4B37] w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrganizationCreate