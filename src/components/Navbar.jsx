import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div className="h-[5rem] w-full bg-gray-200 p-3 flex justify-end items-center font-bold text-[2rem] gap-5">
      <p>ABCD SCHOOL</p>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default Navbar;
