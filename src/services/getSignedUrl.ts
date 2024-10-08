import axios from "axios";
import { config } from "../common/configurations";
import { URL } from "../common/api";

export const getSignedUrl = async (
  type: string | "avatar" | "posts" | "message" | "doc",
  content: string
): Promise<{ url: string; media: string }> => {
  const { data } = await axios.get(
    `${URL}/auth/aws/s3/signedUrl?type=${type}&content=${content}`,
    config
  );
  return data.data;
};
