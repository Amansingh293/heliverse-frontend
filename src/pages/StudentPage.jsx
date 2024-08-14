import React, { useEffect, useState } from "react";
import { getClassStudents } from "../api/student";
import { message, Table } from "antd";

const StudentPage = () => {
  const [students, setStudents] = useState();

  const getStudents = async () => {
    try {
      const response = await getClassStudents();
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Something Went Wrong!");
    }
  };

  const columns = [
    {
      title: "Classroom ID",
      dataIndex: "classroomId",
      key: "classroomId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="p-6 flex flex-col justify-between items-center">
        <div className=" font-bold text-[2.3rem]">All Students in Classroom</div>
      <Table dataSource={students} columns={columns} />
    </div>
  );
};

export default StudentPage;
