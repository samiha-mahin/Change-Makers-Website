import useGetOrganizationById from '@/hooks/useGetOrganizationById';
import { ORGANIZATION_API } from '@/utils/constant';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const OrganizationSetup = () => {

  const params = useParams();
  useGetOrganizationById(params.id);
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  })
  const { singleDuty } = useSelector((store) => store.duty);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) =>{
    const file = e.target.files?.[0];
    setInput({...input,file});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${ORGANIZATION_API}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/organizations');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (singleDuty) {
    setInput({
      name: singleDuty.name || '',
      description: singleDuty.description || '',
      website: singleDuty.website || '',
      location: singleDuty.location || '',
      file: singleDuty.file || null,
    });
  }
}, [singleDuty]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 my-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-8">
            <Button
              type="button"
              onClick={() => navigate('/admin/organizations')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Organization Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            <div>
              <Label className="py-2">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
              <Label className="py-2">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label className="py-2">Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
              <Label className="py-2">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div className="sm:col-span-2">
              <Label className="py-2">Logo</Label>
              <Input type="file" accept="image/*" onChange={fileChangeHandler} />
            </div>
          </div>

          <div className="px-4">
            {loading ? (
              <Button className="w-full my-6" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-6  bg-[#467057] hover:bg-[#2A4B37]">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrganizationSetup