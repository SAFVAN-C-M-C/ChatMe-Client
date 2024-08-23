import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  CssBaseline,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import { darkTheme } from "@/helper/theme";
import CustomToolTip from "./CustomToolTip";
import axios from "axios";
import { config } from "@/common/configurations";
import { URL } from "@/common/api";
import SelectTimeRange from "./Modal/SelectTimeRange";

const JobChart = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("lastWeek"); // default selection
  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const [openSelectTimeRange, setOpenSelectTimeRange] = useState(false);
  const fetchData = async (
    range: string,
    customRange?: { start: string; end: string }
  ) => {
    try {
      let url = `${URL}/job/get/chart/job/data?range=${range}`;
      if (range === "custom" && customRange) {
        url += `&start=${customRange.start}&end=${customRange.end}`;
      }
      const response = await axios.get(url, config);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user growth data:", error);
    }
  };
  useEffect(() => {
    if (timeRange === "custom") {
      setOpenSelectTimeRange(true);
    } else {
      setOpenSelectTimeRange(false);
    }
  }, [timeRange]);
  useEffect(() => {
    fetchData(timeRange, customRange);
  }, [timeRange, customRange]);

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value);
    if (timeRange === "custom") {
      setOpenSelectTimeRange(true);
    } else {
      setOpenSelectTimeRange(false);
    }
  };

  const handleCustomRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomRange({
      ...customRange,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="w-[90%] relative mr-7 p-2  border-dashed rounded-md border-[.5px] border-slate-50 h-[200px] sm:h-[500px]">
        <div className="controll-unit w-full flex justify-between">
          <div className="name">
            <span className="font-semibold text-3xl">Job Posts</span>
          </div>
          <div className="dropdown w-52">
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Select
                fullWidth
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <MenuItem selected value={"lastWeek"}>
                  Last Weak
                </MenuItem>
                <MenuItem value={"lastMonth"}>Last Month</MenuItem>
                <MenuItem value={"lastYear"}>Last Year</MenuItem>
                <MenuItem value={"custom"}>Custom</MenuItem>
              </Select>
            </ThemeProvider>
            {openSelectTimeRange && (
              <SelectTimeRange
                customRange={customRange}
                handleCustomRangeChange={handleCustomRangeChange}
                setOpenSelectTimeRange={setOpenSelectTimeRange}
              />
            )}
          </div>
        </div>
        <div className="grap-content w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={400} data={data}>
              <YAxis />
              <XAxis dataKey={"date"} />
              {/* <CartesianGrid strokeDasharray="7 7"/> */}
              <Tooltip content={<CustomToolTip title="Job Posts" />} />
              {/* <Legend/> */}
              <Area
                type="monotone"
                stroke="#25632b"
                fill="#3b82f6"
                dataKey="userCount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default JobChart;
