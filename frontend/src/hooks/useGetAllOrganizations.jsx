import { ORGANIZATION_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllOrganizations = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchOrganizations = async() => {
        try {
            const res = await axios.get(`${ORGANIZATION_API}/get`,{withCredentials:true})
            if(res.data.success){}
        } catch (error) {
            
        }
    }
  })
}

export default useGetAllOrganizations