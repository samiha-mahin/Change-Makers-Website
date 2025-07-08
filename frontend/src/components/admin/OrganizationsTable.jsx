import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Organizations from "./Organizations";
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
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const OrganizationsTable = () => {
  const { organizations, searchOrganizationByText } = useSelector(
    (store) => store.organization
  );
  const navigate = useNavigate();
  const [filterOrganization, setFilterOrganization] = useState(organizations);

  useEffect(() => {
    const filteredOrganization =
      organizations.length >= 0 &&
      organizations.filter((organization) => {
        if (!searchOrganizationByText) {
          return true;
        }
        return organization?.name
          ?.toLowerCase()
          .includes(searchOrganizationByText.toLowerCase());
      });
    setFilterOrganization(filteredOrganization);
  }, [organizations, searchOrganizationByText]);

  return (
    <Table>
      <TableCaption>A list of your posted duties</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterOrganization.map((organization) => (
          <tr>
            <TableCell>
              <Avatar>
                <AvatarImage src={organization.logo} />
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
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${organization._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrganizationsTable;
