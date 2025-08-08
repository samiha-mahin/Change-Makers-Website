import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API, DUTY_API } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setSingleDuty } from "@/redux/dutySlice";

const DutyDescription = () => {
  const { singleDuty } = useSelector((store) => store.duty);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApply =
    singleDuty?.applications?.some((application) => application.applicant === user?._id) ||
    false;
  const [isApply, setIsApply] = useState(isInitiallyApply);

  const params = useParams();
  const dutyId = params.id;
  const dispatch = useDispatch();

  const dutyHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API}/apply/${dutyId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        setIsApply(true); // update local state
        const updateSingleDuty = {
          ...singleDuty,
          applications: [...singleDuty.applications, { applicant: user?._id }],
        };
        dispatch(setSingleDuty(updateSingleDuty)); // update redux store
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleDuty = async () => {
      try {
        const res = await axios.get(`${DUTY_API}/get/${dutyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleDuty(res.data.duty));
          setIsApply(
            res.data.duty.applications.some((application) => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDuty();
  }, [dutyId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-5 lg:p-10">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full">
          <h1 className="font-bold text-2xl md:text-3xl">{singleDuty?.tittle}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="text-[#467057] font-bold" variant="ghost">
              {singleDuty?.position} Slot
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleDuty?.jobType}
            </Badge>
            <Badge className="text-[#2A4B37] font-bold" variant="ghost">
              {singleDuty?.salary} Hour
            </Badge>
          </div>
        </div>
        {/* Apply Button */}
        <Button
          onClick={isApply ? null : dutyHandler}
          disabled={isApply}
          className={`rounded-lg px-6 py-2 text-lg ${
            isApply
              ? "bg-[#2A4B37] hover:bg-[#2A4B37] cursor-not-allowed"
              : "bg-[#467057] hover:bg-[#2A4B37]"
          }`}
        >
          {isApply ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-lg md:text-xl">
        Duty Description
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-base">
        <h1 className="font-bold">
          Role: <span className="pl-2 font-normal text-gray-800">{singleDuty?.tittle}</span>
        </h1>
        <h1 className="font-bold">
          Location: <span className="pl-2 font-normal text-gray-800">{singleDuty?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description: <span className="pl-2 font-normal text-gray-800">{singleDuty?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience:{" "}
          <span className="pl-2 font-normal text-gray-800">{singleDuty?.experienceLevel}</span>
        </h1>
        <h1 className="font-bold">
          Salary: <span className="pl-2 font-normal text-gray-800">{singleDuty?.workDuration} Hour</span>
        </h1>
        <h1 className="font-bold">
          Applicant:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleDuty?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold">
          Posted Date:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleDuty?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};
export default DutyDescription;