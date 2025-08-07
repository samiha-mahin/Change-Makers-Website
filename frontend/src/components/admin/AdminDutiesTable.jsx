import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminDuties from "@/hooks/useGetAllAdminDuties";

const AdminDutiesTable = () => {
  const { searchDutyByText } = useSelector((store) => store.duty);
  const { allAdminDuties } = useSelector((store) => store.duty);
  const { isLoading, error } = useGetAllAdminDuties();
  const navigate = useNavigate();
  const [filterDuties, setFilterDuties] = useState([]);

  useEffect(() => {
    const filtered = Array.isArray(allAdminDuties)
      ? allAdminDuties.filter((duty) => {
          if (!searchDutyByText) return true;
          return (
            duty?.tittle
              ?.toLowerCase()
              .includes(searchDutyByText.toLowerCase()) ||
            duty?.organization?.name
              ?.toLowerCase()
              ?.includes(searchDutyByText.toLowerCase())
          );
        })
      : [];
    setFilterDuties(filtered);
  }, [allAdminDuties, searchDutyByText]);

  if (isLoading) {
    return <div className="p-2 text-center">Loading duties...</div>;
  }

  if (error) {
    return <div className="p-2 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-2">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        {filterDuties.length > 0 ? (
          filterDuties.map((duty) => (
            <div
              key={duty._id}
              className="border p-4 rounded-lg shadow-md space-y-1"
            >
              <div className="font-semibold text-lg">
                {duty?.tittle || "No Title"}
              </div>
              <div className="text-sm text-gray-600">
                {duty?.organization?.name || "No Organization"}
              </div>
              <div className="text-sm text-gray-500">
                {duty?.createdAt?.split("T")[0] || "No Date"}
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <Edit2
                  className="w-4 cursor-pointer"
                  onClick={() => navigate(`/admin/duties/${duty._id}`)}
                />
                <Eye
                  className="w-4 cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/duties/${duty._id}/applicants`)
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No duties found</div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableCaption>A list of your posted duties</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Organization Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterDuties.length > 0 ? (
              filterDuties.map((duty) => (
                <TableRow key={duty._id}>
                  <TableCell>{duty?.organization?.name || "N/A"}</TableCell>
                  <TableCell>{duty?.tittle || "N/A"}</TableCell>
                  <TableCell>
                    {duty?.createdAt?.split("T")[0] || "N/A"}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className="flex flex-col items-start gap-2">
                          <div
                            onClick={() =>
                              navigate(`/admin/duties/${duty._id}`)
                            }
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/admin/duties/${duty._id}/applicants`)
                            }
                            className="flex items-center gap-2 cursor-pointer mt-2"
                          >
                            <Eye className="w-4" />
                            <span>Applicants</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No duties found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDutiesTable;
