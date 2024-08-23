/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { config } from "../common/configurations";
import toast from "react-hot-toast";

export const applyForRecruiter = async (formData: {
  companyEmail: string;
  name: string;
  content: string;
}) => {
  try {
    const { data } = await axios.post(
      `${URL}/profile/apply-recruiter`,
      formData,
      config
    );
    return data;
  } catch (error: any) {
    toast.error("something wrong plese try again");
  }
};
