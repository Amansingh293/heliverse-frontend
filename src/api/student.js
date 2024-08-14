import { instance } from ".";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const getClassStudents = async () => {
  try {
    const response = await instance.get("/api/students/all-students", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
