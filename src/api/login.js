import { instance } from ".";

export const loginUser = async (payload) => {
  try {
    const response = await instance.post("/api/principal/login", payload);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
