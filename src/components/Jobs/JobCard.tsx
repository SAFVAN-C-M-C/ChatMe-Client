import { useEffect, useState } from "react";

const JobCard = () => {
  const colors = [
    "bg-red-900",
    "bg-green-900",
    "bg-purple-900",
    "bg-gray-900",
    "bg-violet-900",
    "bg-yellow-900",
    "bg-indigo-900",
    "bg-orange-900",
    "bg-emerald-900",
  ];
  const [bgColor, setBgColor] = useState('lime');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);
  return (
    <>
      <div className="card job_card bg-slate-100 h w-[300px] shadow-xl">
        <figure className={`${bgColor} p-8`}>
          <img
            className="rounded-full h-24 w-24"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </>
  );
};

export default JobCard;
