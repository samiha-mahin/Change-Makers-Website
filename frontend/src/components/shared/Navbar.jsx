import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Animated Gradient Logo */}
        <motion.h1
          className="text-2xl font-bold bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "linear-gradient(to right, #047857, #facc15, #dc2626)",
            backgroundSize: "200% 200%",
          }}
        >
          Change
          <span className="text-transparent bg-gradient-to-r from-red-600 to-red-400 bg-clip-text">
            Makers
          </span>
        </motion.h1>
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

         {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center text-gray-600 font-medium gap-5">
           {user && user.role === "recruiter" ? (
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
          {
            !user ?(
              <div className="flex items-center gap-5">
                <Link to="/login"><Button className="text-gray-600" variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="text-white bg-green-700 hover:bg-green-900">Sign Up</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto}/>
                  </Avatar>
                </PopoverTrigger>
              </Popover>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
