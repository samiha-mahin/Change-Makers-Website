import { setAllDuties } from '@/redux/dutySlice';
import { DUTY_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllDuties = () => {
 const dispatch = useDispatch();
 const {searchedQuery} = useSelector(store=>store.duty);
 useEffect(() => {
  const fetchAllDuties = async () => {
    try {
      const query = searchedQuery ? `?keyword=${searchedQuery}` : "";
      const res = await axios.get(`${DUTY_API}/get${query}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAllDuties(res.data.duties));
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllDuties();
}, [searchedQuery]);
}

export default useGetAllDuties;