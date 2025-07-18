import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import Footer from "../shared/Footer";
import { USER_API } from "@/utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message || "Signup successful!");
      }
    } catch (error) {
      console.log(error); // Debugging purposes
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer inline-flex items-center p-6 rounded-md hover:bg-gray-200 transition-colors"
      >
        <ArrowBigLeft size={24} />
      </div>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-6 my-10 shadow-xl"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={eventHandler}
              placeholder="Enter Full Name"
              className="w-full my-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={eventHandler}
              placeholder="Email"
              className="w-full my-2  p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={eventHandler}
              placeholder="Phone Number"
              className="w-full my-2  p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={eventHandler}
              placeholder="Enter Password"
              className="w-full my-2  p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
            {/* Radio Buttons */}
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="user"
                  checked={input.role === "user"}
                  onChange={eventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">User</Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={input.role === "admin"}
                  onChange={eventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Admin</Label>
              </div>
            </RadioGroup>

            {/* File Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Label className="text-gray-500 font-bold">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={fileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="Submit" className="w-full my-4">
              Sign Up
            </Button>
          )}

          <span className="text-sm block text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
