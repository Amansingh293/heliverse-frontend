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
    if (
      localStorage.getItem("token") == undefined ||
      localStorage.getItem("role") == undefined
    ) {
      message.error("Please Login Again");
      navigate("/");
    }
  };

  useEffect(() => {
    tokenChecker();
  }, []);

  return (
    <div className="">
      {role == "PRINCIPAL" && <PrincipalPage />}
      {role == "TEACHER" && <TeacherPage />}
      {role == "STUDENT" && <StudentPage/>}
    </div>
  );
};

export default Homepage;
