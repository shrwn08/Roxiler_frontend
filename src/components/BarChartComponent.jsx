import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarChartComponent = ({ data, selectedMonth }) => {

  // if (!data || data.length === 0) {
  //   return (
  //     <div className="w-3/5 bg-[#E2BEBE] flex justify-center items-center p-4">
  //       <p>No data available for the selected month.</p>
  //     </div>
  //   );
  // }

  const monthName = monthNames[selectedMonth];

  return (
    <div className="w-3/5 bg-[#E2BEBE] flex flex-col items-center p-4 mt-5">
      <p className="text-3xl font-bold">Bar Chart of {monthName}</p>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
