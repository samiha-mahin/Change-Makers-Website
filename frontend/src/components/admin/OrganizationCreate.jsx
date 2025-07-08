import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const OrganizationCreate = () => {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState();
  const dispatch = useDispatch();
  return (
    <div>OrganizationCreate</div>
  )
}

export default OrganizationCreate