import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      </div>
    </nav>
  );
};

export default Navbar;
