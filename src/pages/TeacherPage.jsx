import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Table,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createTimeTableTeacher,
  createUserStudent,
  deleteUserStudent,
  editUserTeacher,
  getAllStudentsToTeacher,
  getTeacherClass,
} from "../api/teacherApi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TeacherPage = () => {
  const [allStudents, setAllStudents] = useState();
  const [data, setData] = useState();
  const [currentRecord, setCurrentRecord] = useState({});
  const [editmodal, setEditmodal] = useState();
  const [registeredModal, setRegisteredModal] = useState();
  const [classroomData, setClassroomData] = useState();
  const [form2] = Form.useForm();
  const [role, setRole] = useState("student");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [isTimeTableModalVisible, setIsTimeTableModalVisible] = useState(null);
  const [form] = Form.useForm();

  const getAllStudentsTeacher = async () => {
    try {
      const response = await getAllStudentsToTeacher();
      setAllStudents(response.data.allStudents);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const fetchAllClassrooms = async () => {
    try {
      const response = await getTeacherClass();
      setClassroomData([response.data]);
      console.log(response.data);
    } catch (error) {
      message.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    getAllStudentsTeacher();
    fetchAllClassrooms();
  }, []);

  const createTimeTable = async (values) => {
    try {
      console.log(values);
      const response = await createTimeTableTeacher(values);
      message.error(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      if (error && error.data) {
        // Handle error response
        message.error(error.data.message || "An error occurred");
      } else {
        // Handle unexpected errors
        message.error("An unexpected error occurred");
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Classroom ID",
      dataIndex: "classroomId",
      key: "classroomId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(), // Format the date
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleString(), // Format the date
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<FaRegEdit />}
            onClick={() => {
              setEditmodal(true);
              setCurrentRecord(record);
            }}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<MdDelete />}
            onClick={() => deleteHandler(record.id)}
            danger
          />
        </div>
      ),
    },
  ];
  const deleteHandler = async (id) => {
    try {
      const response = await deleteUserStudent(id);
      console.log(response.message);
      message.success(response.message);
      getAllStudentsTeacher();
    } catch (error) {
      message.error("Something Went Wrong!");
    }
  };
  useEffect(() => {
    if (role === "student") {
      form2.setFieldsValue({ classroomId: selectedClassroom });
    }
  }, [role, selectedClassroom]);

  const handleRoleChange = (value) => {
    setRole(value);
  };
  const handleSave = async (values) => {
    try {
      console.log(values);
      console.log(currentRecord);
      const newValues = {
        ...currentRecord,
        name: values.name,
        email: values.email,
      };

      const response = await editUserTeacher(newValues);
      console.log(response);
      getAllStudentsTeacher();
      console.log(newValues);
    } catch (e) {
      console.log(e);
      message.error(e);
    }
    setEditmodal(false);
  };
  const handleRegister = async (values) => {
    console.log("Form Submitted with Values:", values);
    try {
      const response = await createUserStudent(values);
      console.log(response.data);
      message.success("User registered successfully!");
      getAllStudentsTeacher();
      fetchAllClassrooms();
    } catch (error) {
      message.error("Failed to register user");
    }

    setRegisteredModal(false);
  };
  return (
    <>
      <div className=" flex flex-col gap-5 p-7">
        <div className="flex justify-around items-center">
          <Button
            onClick={() => setRegisteredModal(true)}
            className="w-[10rem]"
          >
            Register User
          </Button>
          {/* <Button
            onClick={() => setIsTimeTableModalVisible(true)}
            className="w-[10rem]"
          >
            Create Timetable
          </Button> */}
        </div>

        <div className="font-bold text-[2rem]">
          Classname : {data?.classroomName}
        </div>
        <Table
          dataSource={allStudents}
          columns={columns}
          pagination={{ pageSize: 10 }} // Adjust page size as needed
        />
      </div>
      {editmodal && (
        <Modal
          title="Edit Student Details"
          visible={editmodal}
          onCancel={() => setEditmodal(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleSave}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}{" "}
      {registeredModal && (
        <Modal
          title="Register User"
          visible={registeredModal}
          onCancel={() => setRegisteredModal(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleRegister}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="Role" name="role" initialValue={role}>
              <p>Student Role</p>
            </Form.Item>

            <Form.Item
              label="Select Classroom"
              name="classroom"
              rules={[
                { required: true, message: "Please select a classroom!" },
              ]}
            >
              <Select
                placeholder="Select a classroom"
                onChange={(value) => setSelectedClassroom(value)}
              >
                {classroomData?.map((classroom) => (
                  <Option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
      {/* {isTimeTableModalVisible && (
        <Modal
          title="Create Timetable"
          visible={isTimeTableModalVisible}
          footer={null}
          onCancel={() => setIsTimeTableModalVisible(false)}
        >
          <Form layout="vertical" onFinish={createTimeTable}>
            <Form.Item
              name="subjectName"
              label="Subject Name"
              rules={[
                { required: true, message: "Please input the subject name!" },
              ]}
            >
              <Input placeholder="Enter Subject Name" />
            </Form.Item>

            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[
                { required: true, message: "Please select the start time!" },
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="End Time"
              rules={[
                { required: true, message: "Please select the end time!" },
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="dayOfWeek"
              label="Day of the Week"
              rules={[
                {
                  required: true,
                  message: "Please select the day of the week!",
                },
              ]}
            >
              <Select placeholder="Select Day">
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
                <Option value="Sunday">Sunday</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-400">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )} */}
    </>
  );
};

export default TeacherPage;
