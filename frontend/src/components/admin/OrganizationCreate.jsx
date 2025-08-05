import { setSingleOrganization } from '@/redux/organizationSlice';
import { ORGANIZATION_API } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const OrganizationCreate = () => {
  const [input, setInput] = useState({ organizationName: '' });
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${ORGANIZATION_API}/register`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleOrganization(res.data.organization));
        toast.success(res.data.message || 'Organization created');
        const organizationId = res.data.organization?._id;
        navigate(`/admin/organizations/${organizationId}`);
      }
    } catch (error) {
      console.log(error);
      const err = error.response?.data?.message || 'Something went wrong';
      toast.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:px-6">
        <form onSubmit={submitHandler}>
          <div className="my-10">
            <h1 className="font-bold text-2xl">Your Organization Name</h1>
            <p className="text-gray-500">You can change this later</p>
          </div>

          <div className="my-3">
            <Label>Organization Name</Label>
            <Input
              type="text"
              name="organizationName"
              value={input.organizationName}
              onChange={eventHandler}
              placeholder="Enter your organization name"
              className="my-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 my-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/organizations')}
              className="w-full sm:w-auto"
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="text-white bg-[#467057] hover:bg-[#2A4B37] w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationCreate;
