import axios from "axios";
import { EmployeeApiResponse } from "../types/data-karyawan";
import { axiosInstance } from "../axios";

export const getDataKaryawan = async () : Promise<EmployeeApiResponse> => {
  try {
    const res = await axiosInstance.get<EmployeeApiResponse>("/api/data-karyawan");
    return res.data;
  } catch (error) {
    console.error("Error getDataKaryawan:", error);
    throw error;
  }
};