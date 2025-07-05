import useGetAllOrganizations from '@/hooks/useGetAllOrganizations'
import React from 'react'

const Organizations = () => {
  useGetAllOrganizations();
  
  return (
    <div>Admin will register oragnization to create job</div>
  )
}

export default Organizations