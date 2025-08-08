import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Duty = ({ duty }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const pay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/bkash/payment/create",
        { amount: 50, orderId: duty?._id },  // Pass duty._id as orderId for reference
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <div className="p-5 md:p-6 rounded-lg shadow-lg bg-white border border-gray-200 w-full max-w-lg md:max-w-2xl mx-auto">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(duty?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(duty?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      {/* Organization Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 md:w-14 md:h-14">
          <AvatarImage src={duty?.organization?.logo} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-md md:text-lg">
            {duty?.organization?.name}
          </h1>
          <p className="text-sm text-gray-600">{duty?.organization?.location}</p>
        </div>
      </div>

      {/* Duty Title & Description */}
      <div>
        <h1 className="font-bold text-lg md:text-xl my-2">{duty?.tittle}</h1>
        <p className="text-sm md:text-base text-gray-600 truncate md:line-clamp-2">
          {duty?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-green-700 font-bold" variant="ghost">
          {duty?.position} Slot
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {duty?.jobType}
        </Badge>
        <Badge className="text-[#2A4B37] font-bold" variant="ghost">
          {duty?.workDuration} Hour
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${duty?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          onClick={pay}
          className="bg-[#467057] hover:bg-[#2A4B37] w-full sm:w-auto"
        >
          Donate
        </Button>
      </div>
    </div>
  );
};

export default Duty;
