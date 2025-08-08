import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./shared/Footer";
import { setSearchedQuery } from "@/redux/dutySlice";
import Duty from "./Duty";
import useGetAllDuties from "@/hooks/useGetAllDuties";

const Browse = () => {
  useGetAllDuties();
  const { allDuties } = useSelector((store) => store.duty);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10 md: ml-3">
          Search Results ({allDuties.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDuties.map((duty) => {
            return <Duty key={duty._id} duty={duty} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;