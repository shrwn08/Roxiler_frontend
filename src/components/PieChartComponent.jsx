import { Tooltip, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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

const PieChartComponent = ({ data, selectedMonth }) => {

  const monthName = monthNames[selectedMonth];
  // Check if data exists and is valid
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available for the selected month.</div>;
  }

  // Convert object data to array format
  const formattedData = Object.keys(data).map((key) => ({
    category: key,
    count: data[key],
  }));

  return (
    <div className="flex flex-col items-center  ">
      <p className="text-2xl font-semibold ">Category Distribution in {monthName}</p>
      <PieChart width={400} height={400}>
        <Pie
          data={formattedData}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
