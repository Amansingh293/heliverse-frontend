import { instance } from ".";


export const getClassStudents = async ()=>{
    try {
        const response = await instance.get("/api/students/all-students");
        return response.data;
    } catch (error) {
        return error.message;
    }
}