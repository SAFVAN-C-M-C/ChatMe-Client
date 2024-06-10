import axios from "axios";
import { config, handleError } from "../common/configurations";

export const applyForRecruiter = async (formData: {
  companyEmail: string;
  name: string;
  content: string;
}) => {
    try {
        const { data } = await axios.post(`${URL}/profile/apply-recruiter`,formData, config);
        return data;
      } catch (error: any) {
        console.log(error);
      }
};
