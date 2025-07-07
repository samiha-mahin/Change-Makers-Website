import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Organizations from './Organizations';
import { Table, TableCaption } from '../ui/table';

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
   <Table>
     <TableCaption>A list of your posted duties</TableCaption>
   </Table>
  )
}

export default OrganizationsTable