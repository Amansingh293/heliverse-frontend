import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrincipalPage from "./PrincipalPage";
import TeacherPage from "./TeacherPage";
import StudentPage from "./StudentPage";

const Homepage = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const navigate = useNavigate();

  const tokenChecker = () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token || !storedRole) {
      message.error("Please Login Again");
      navigate("/");
      return;
    }

    setRole(storedRole);
  };

  useEffect(() => {
    tokenChecker();
  }, []);

  return (
    <div className="w-[100%]">
      {role == "PRINCIPAL" && <PrincipalPage />}
      {role == "TEACHER" && <TeacherPage />}
      {role == "STUDENT" && <StudentPage />}
    </div>
  );
};

export default Homepage;
