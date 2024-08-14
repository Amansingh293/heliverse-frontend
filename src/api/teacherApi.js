import { instance } from ".";

export const getAllStudentsToTeacher = async () => {
  try {
    const response = await instance.get("/api/teacher/get-all-students");
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const createUserStudent = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post(
      "/api/teacher/create-student",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
export const createTimeTableTeacher = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post(
      "/api/teacher/create-timetable",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
export const editUserTeacher = async (payload) => {
  try {
    const response = await instance.patch("/api/teacher/edit-user", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data || "Internal Server Error";
  }
};
export const getTeacherClass = async () => {
  try {
    const response = await instance.get("/api/teacher/get-classrooms-teacher");
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const deleteUserStudent = async (payload) => {
  try {
    const response = await instance.delete(
      `/api/teacher/delete-user?id=${payload}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
