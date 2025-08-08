import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Menu, X, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { USER_API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Animated Gradient Logo */}
        <motion.h1
          className="text-2xl font-bold bg-clip-text text-transparent cursor-pointer"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage: "linear-gradient(to right, #6DA683, #467057, #345441)",
            backgroundSize: "200% 200%",
          }}
          onClick={() => navigate("/")}
        >
          Change
          <span className="text-transparent bg-gradient-to-r from-red-600 to-red-400 bg-clip-text">
            Makers
          </span>
        </motion.h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center text-gray-600 font-medium gap-5">
            {user && user.role === "admin" ? (
              <>
                <Link to="/admin/organizations"><li>Organizations</li></Link>
                <Link to="/admin/duties"><li>Duties</li></Link>
              </>
            ) : (
              <>
                <Link to="/"><li>Home</li></Link>
                <Link to="/duties"><li>Duties</li></Link>
                <Link to="/browse"><li>Browse</li></Link>
              </>
            )}
          </ul>

          {/* Authentication/Profile Section */}
          {!user ? (
            <div className="flex items-center gap-5">
              <Link to="/login">
                <Button className="text-gray-600" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white bg-[#467057] hover:bg-[#2A4B37]">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || "images/July.png"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto || "images/July.png"} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{user?.profile?.bio || "No bio available"}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {user.role === "user" && (
                    <Button variant="link" className="flex items-center gap-2" asChild>
                      <Link to="/profile">
                        <User2/> View Profile
                      </Link>
                    </Button>
                  )}
                  <Button
                    onClick={logOutHandler}
                    variant="link"
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <LogOut /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t bg-white">
          <ul className="flex flex-col items-center font-medium gap-4">
            {user && user.role === "admin" ? (
              <>
                <Link to="/admin/organizations"><li>Organizations</li></Link>
                <Link to="/admin/duties"><li>Duties</li></Link>
              </>
            ) : (
              <>
                <Link to="/"><li>Home</li></Link>
                <Link to="/duties"><li>Duties</li></Link>
                <Link to="/browse"><li>Browse</li></Link>
              </>
            )}
          </ul>

          {/* Authentication/Profile Section in Mobile */}
          {!user ? (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#467057] hover:bg-[#2A4B37] text-white">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto || "images/July.png"} />
              </Avatar>
              <h4 className="font-medium">{user.fullname}</h4>
              <p className="text-sm text-muted-foreground text-center px-4 truncate max-w-xs">{user?.profile?.bio || "No bio available"}</p>
              {user.role === "student" && (
                <Button variant="link" className="mt-2">
                  <Link to="/profile">View Profile</Link>
                </Button>
              )}
              <Button onClick={logOutHandler} variant="link" className="text-red-600 hover:text-red-800">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
