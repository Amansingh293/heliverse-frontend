import React, { useEffect, useState } from "react";
import {
  getAllTeachers,
  getAllStudents,
  createClassroom,
  editUser,
  getAllTeachersAvailable,
  getAllClassrooms,
  deleteUser,
  assignTeacherToClassroom,
  createUser,
} from "../api/principalApi";
import moment from "moment";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  TimePicker,
} from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "../components/Loader";

const PrincipalPage = () => {
  const [teachers, setTeachers] = useState();
  const [availableTeachers, setAvailableTeachers] = useState();
  const [students, setStudents] = useState();
  const [editmodal, setEditmodal] = useState();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [classroomData, setClassroomData] = useState();
  const [teacherAssignModal, setTeacherAssignModal] = useState(false);
  const [role, setRole] = useState("teacher");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [registeredModal, setRegisteredModal] = useState();
  const [fetcher, setFetcher] = useState(false);
  const [view, setView] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalView, setModalView] = useState(false);

  const [currentRecord, setCurrentRecord] = useState({});

  const fetchAllTeachers = async () => {
    try {
      const response = await getAllTeachers();
      setTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Something went wrong!!");
    }
  };
  console.log("REACHED++++");
  const fetchAllTeachersAvailable = async () => {
    try {
      const response = await getAllTeachersAvailable();
      setAvailableTeachers(response.data);
    } catch (e) {
      message.error("Something went wrong!!");
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
  const fetchAllStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    fetchAllTeachers();
    fetchAllStudents();
    fetchAllTeachersAvailable();
    fetchAllClassrooms();
  }, []);

  useEffect(() => {
    fetchAllTeachers();
    fetchAllStudents();
    fetchAllTeachersAvailable();
    fetchAllClassrooms();
  }, [fetcher]);

  const columnsTeachers = [
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

  const columnsStudents = [
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
      title: "Classroom Id",
      dataIndex: "classroomId",
      key: "classroomId",
      render: (_, record) => record.classroomId || "No classroom assigned!!", // Format the date
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

  const assignTeacher = async (values) => {
    setLoading(true);
    try {
      const record = { ...currentRecord, teacherId: selectedTeacherId };
      console.log(record);
      const response = await assignTeacherToClassroom(record);
      console.log(response.data);
      message.success("Assigned");
      fetchAllClassrooms();
      fetchAllTeachersAvailable();
      setTeacherAssignModal(false);
    } catch (error) {
      message.error(response.data.message);
    }
    setLoading(false);
  };
  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    const formattedSchedules = values.schedules.map((schedule) => ({
      ...schedule,
      startTime: moment(schedule.startTime.$d).format("HH:mm:ss"),
      endTime: moment(schedule.endTime.$d).format("HH:mm:ss"),
      date: moment(schedule.date.$d).format("YYYY-MM-DD"),
    }));

    const newValues = {
      ...values,
      schedules: formattedSchedules,
    };

    try {
      const response = await createClassroom(newValues);
      message.success("Classroom created successfully");
      console.log("Submitted values:", newValues);
      setModalView(false);
      setFetcher(!fetcher);
    } catch (error) {
      console.error("Error submitting classroom:", error);
      message.error("Something went wrong!!", error);
    }
    setLoading(false);
  };
  const handleSave = async (values) => {
    setLoading(true);

    try {
      console.log(values);
      console.log(currentRecord);
      const newValues = {
        ...currentRecord,
        name: values.name,
        email: values.email,
      };

      const response = await editUser(newValues);
      console.log(response);
      fetchAllStudents();
      fetchAllTeachers();
      console.log(newValues);
    } catch (e) {
      console.log(e);
      message.error(e);
    }
    setEditmodal(false);
    setLoading(false);
  };

  const fetchAllClassrooms = async () => {
    try {
      const response = await getAllClassrooms();
      setClassroomData(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Something Went Wrong!");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log(response.message);
      message.success(response.message);
      fetchAllClassrooms();
      fetchAllStudents();
      fetchAllTeachers();
    } catch (error) {
      message.error("Something Went Wrong!");
    }
  };
  const scheduleColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(), // Format the date
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
  ];
  const columns = [
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
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Teacher ID",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (_, record) => record.teacherId || "No Teacher Assigned!",
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
      title: "Schedules",
      key: "availableSchedules",
      render: (_, record) => (
        <Table
          columns={scheduleColumns}
          dataSource={record.availableSchedules}
          pagination={false} // Disable pagination for the nested table
          rowKey="id"
        />
      ),
    },
    {
      title: "Assign Teacher",
      dataIndex: "",
      key: "assignTeacher",
      render: (_, record) =>
        !record.teacherId && (
          <div className="flex justify-center items-center">
            <Button
              icon={<FaRegEdit />}
              onClick={() => {
                setTeacherAssignModal(true);
                setCurrentRecord(record);
              }}
              style={{ marginRight: 8 }}
            />
          </div>
        ),
    },
  ];

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await createUser(values);
      console.log(response.data);
      message.success("User registered successfully!");
      setFetcher(!fetcher);
    } catch (error) {
      message.error("Failed to register user");
    }

    setRegisteredModal(false);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-around items-center h-full gap-5 p-6">
          <div
            className="flex justify-end lg:w-full flex-col md:flex-row items-center gap-5"
            onClick={""}
          >
            <Button onClick={() => setView("STUDENT")}>Student</Button>
            <Button onClick={() => setView("TEACHER")}>Teacher</Button>
            <Button onClick={() => setView("CLASSROOM")}>Classroom</Button>
            <Button onClick={() => setRegisteredModal(true)}>
              Register User
            </Button>
            <Button onClick={() => setModalView(!modalView)}>
              Create Classroom
            </Button>
          </div>

          {view === "TEACHER" && (
            <div className="w-full overflow-auto">
              <Table
                columns={columnsTeachers}
                dataSource={teachers}
                pagination={false}
                className="shadow-xl rounded-xl overflow-hidden"
              />
            </div>
          )}

          {(view == "STUDENT" || view == "") && (
            <div className="w-full overflow-auto">
              <Table
                columns={columnsStudents}
                dataSource={students}
                pagination={false}
                className="shadow-xl rounded-xl overflow-hidden"
              />
            </div>
          )}

          {modalView && (
            <Modal
              title="Add Classroom Details"
              visible={modalView}
              onCancel={() => setModalView(!modalView)}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="name"
                  label="Classroom Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the classroom name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="standard"
                  label="Standard"
                  rules={[
                    { required: true, message: "Please input the standard!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="teacherId"
                  label="Teacher ID"
                  rules={[
                    { required: true, message: "Please input the teacher ID!" },
                  ]}
                >
                  <Select placeholder="Select a teacher">
                    {availableTeachers?.map((teacher) => (
                      <Select.Option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Schedule Section */}
                <Form.Item
                  name="schedules"
                  label="Class Schedule"
                  rules={[
                    {
                      required: true,
                      message: "Please add at least one schedule!",
                    },
                  ]}
                >
                  {/* Dynamic Field for Multiple Schedules */}
                  <Form.List name="schedules">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <div key={key}>
                            <Form.Item
                              {...restField}
                              name={[name, "day"]}
                              fieldKey={[fieldKey, "day"]}
                              label="Day"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select the day!",
                                },
                              ]}
                            >
                              <Input placeholder="e.g., Monday" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "date"]}
                              fieldKey={[fieldKey, "date"]}
                              label="Date"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select the date!",
                                },
                              ]}
                            >
                              <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "startTime"]}
                              fieldKey={[fieldKey, "startTime"]}
                              label="Start Time"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select the start time!",
                                },
                              ]}
                            >
                              <TimePicker format="HH:mm:ss" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "endTime"]}
                              fieldKey={[fieldKey, "endTime"]}
                              label="End Time"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select the end time!",
                                },
                              ]}
                            >
                              <TimePicker format="HH:mm:ss" />
                            </Form.Item>
                            <Button type="danger" onClick={() => remove(name)}>
                              Remove Schedule
                            </Button>
                            <hr />
                          </div>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            Add Schedule
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}

          {editmodal && (
            <Modal
              title="Edit Teacher Details"
              visible={editmodal}
              onCancel={() => setEditmodal(false)}
              footer={null}
            >
              <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input the email!" },
                  ]}
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
          )}

          {view == "CLASSROOM" && (
            <div className="w-full overflow-auto">
              <Table
                dataSource={classroomData}
                columns={columns}
                pagination={{ pageSize: 5 }} // Adjust page size as needed
                rowKey="id"
              />
            </div>
          )}

          {teacherAssignModal && (
            <Modal
              title="Assign Teacher"
              visible={teacherAssignModal}
              onCancel={() => setTeacherAssignModal(false)}
              onOk={assignTeacher}
              okText="Assign"
            >
              <Form layout="vertical">
                <Form.Item label="Select Teacher">
                  <Select
                    placeholder="Select a teacher"
                    value={selectedTeacherId}
                    onChange={(value) => setSelectedTeacherId(value)}
                  >
                    {availableTeachers.map((teacher) => (
                      <Option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          )}

          {registeredModal && (
            <Modal
              title="Register User"
              visible={registeredModal}
              onCancel={() => setRegisteredModal(false)}
              footer={null}
            >
              <Form form={form2} layout="vertical" onFinish={handleRegister}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input the name!" },
                  ]}
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
                  <Select onChange={handleRoleChange}>
                    <Option value="teacher">Teacher</Option>
                    <Option value="student">Student</Option>
                  </Select>
                </Form.Item>

                {role === "student" && (
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
                      {classroomData.map((classroom) => (
                        <Option key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default PrincipalPage;
