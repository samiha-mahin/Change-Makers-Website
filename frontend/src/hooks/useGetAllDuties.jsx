import { setAllDuties } from '@/redux/dutySlice';
import { DUTY_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllDuties = () => {
 const dispatch = useDispatch();
 const {searchedQuery} = useSelector(store=>store.duty);
 useEffect(()=>{
    const fecthAllDuties = async()=>{
        try {
            const res = await axios.get(`${DUTY_API}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllDuties(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fecthAllDuties();
 },[])
}

export default useGetAllDuties;