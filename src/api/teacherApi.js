import { instance } from ".";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const getAllStudentsToTeacher = async () => {
  try {
    const response = await instance.get("/api/teacher/get-all-students", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const createUserStudent = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post(
      "/api/teacher/create-student",
      payload,
      { headers: getAuthHeaders() }
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
      payload,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const editUserTeacher = async (payload) => {
  try {
    const response = await instance.patch("/api/teacher/edit-user", payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data || "Internal Server Error";
  }
};

export const getTeacherClass = async () => {
  try {
    const response = await instance.get("/api/teacher/get-classrooms-teacher", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const deleteUserStudent = async (payload) => {
  try {
    const response = await instance.delete(
      `/api/teacher/delete-user?id=${payload}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
