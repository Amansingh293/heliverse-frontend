import { instance } from ".";

export const getAllTeachersAvailable = async () => {
  try {
    const response = await instance.get(
      "/api/principal/get-all-teachers-available"
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
export const getAllTeachers = async () => {
  try {
    const response = await instance.get("/api/principal/get-all-teachers");
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
export const getAllStudents = async () => {
  try {
    const response = await instance.get("/api/principal/get-all-students");
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const createClassroom = async (payload) => {
  try {
    const response = await instance.post(
      "/api/principal/create-classroom",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const assignTeacherToClassroom = async (payload) => {
  try {
    const response = await instance.post(
      "/api/principal/assign-teacher-to-classroom",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const editUser = async (payload) => {
  try {
    const response = await instance.patch("/api/principal/edit-user", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data || "Internal Server Error";
  }
};

export const getAllClassrooms = async () => {
  try {
    const response = await instance.get("/api/principal/get-all-classrooms");
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
export const deleteUser = async (payload) => {
  try {
    const response = await instance.delete(
      `/api/principal/delete-user?id=${payload}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const createUser = async (payload) => {
  try {
    console.log(payload)
    const response = await instance.post(
      "/api/principal/create-teacher-user",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.message)
    return error.message;
  }
};
