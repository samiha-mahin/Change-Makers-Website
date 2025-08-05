import { setSingleOrganization } from '@/redux/organizationSlice';
import { ORGANIZATION_API } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar';

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
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default OrganizationCreate