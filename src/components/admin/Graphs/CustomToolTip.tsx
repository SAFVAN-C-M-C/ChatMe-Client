import { FC } from "react";
import { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
  title: string;
}
const CustomToolTip: FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  title,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="font-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          {title} :<span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomToolTip;
