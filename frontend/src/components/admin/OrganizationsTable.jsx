import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "../ui/avatar";
import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const OrganizationsTable = ({ organizations }) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>A list of your posted organizations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => (
          <TableRow key={organization._id}>
            <TableCell>
              <Avatar>
                <img src={organization.logo} alt={organization.name} />
              </Avatar>
            </TableCell>
            <TableCell>{organization.name}</TableCell>
            <TableCell>{organization.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    onClick={() =>
                      navigate(`/admin/organizations/${organization._id}`)
                    }
                    className="flex items-center gap-2 w-fit cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrganizationsTable;
