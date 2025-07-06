import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Organizations from './Organizations';

const OrganizationsTable = () => {
  const {organizations , searchOrganizationByText} = useSelector((store)=> store.organization);
  const navigate = useNavigate();
  const [filterOrganization,setFilterOrganization] = useState(organizations);

  useEffect(()=>{
    const filteredOrganization = organizations.length >= 0 && organizations.filter((organization)=>{
      if(!searchOrganizationByText) {
        return true;
      };
      return organization?.name?.toLowerCase().includes(searchOrganizationByText.toLowerCase())
    })
    setFilterOrganization(filteredOrganization);
  },[organizations, searchOrganizationByText]);
  
  return (
    <div>OrganizationsTable</div>
  )
}

export default OrganizationsTable