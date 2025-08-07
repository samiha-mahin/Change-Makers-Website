import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetAllAdminDuties from "@/hooks/useGetAllAdminDuties";
import { useDispatch } from "react-redux";
import { setSearchDutyByText } from "@/redux/dutySlice";
import AdminDutiesTable from "./AdminDutiesTable";


const AdminDuties = () => {
  useGetAllAdminDuties;
  const [input, setInput] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchDutyByText(input))
  },[input])

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex items-center justify-between my-5">
          <Input 
          className="w-fit" 
          placeholder="Filter by organization, role"
          onChange = {(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/duties/create")}
            className="bg-[#467057] hover:bg-[#2A4B37] text-white"
          >
           Post New Duty
          </Button>
        </div>
        <AdminDutiesTable/>
      </div>
    </div>
  );
};

export default AdminDuties;