import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface JobDescriptionProps {
  jd: string;
}
const JobDescription: FC<JobDescriptionProps> = ({ jd }) => {
  return (
    <>
      <div className="job-description mt-7">
        <div className="header mb-3">
          <span className="font-medium text-lg ">Description :-</span>
        </div>
        <Box>
          <Typography
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: jd }}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </Box>
      </div>
    </>
  );
};

export default JobDescription;
