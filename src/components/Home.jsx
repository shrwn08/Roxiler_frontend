import { useState, useEffect } from "react";
import axios from "axios";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import apiBackend from "./apiBackend";
import TransactionsTable from "./TransactionTable";
import TransactionsStats from "./TransactionsStats";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("3"); // Default to March (index)
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthName = monthNames[selectedMonth];

        // Fetch transactions data
        const transactionsResponse = await axios.get(
          `${apiBackend}/transactions/search?month=${monthName}&page=${page}&perPage=${perPage}`
        );
        setTransactionsData(transactionsResponse.data.transactions);
        setTotalPages(transactionsResponse.data.totalPages);

        //fetch statistics data
        const statsResponse = await axios.get(
          `${apiBackend}/statistics/search?month=${monthName}`
        );
        setStatsData(statsResponse.data);
       

        // Fetch bar chart data
        const barDataResponse = await axios.get(
          `${apiBackend}/barchart/search?month=${monthName}`
        );
        
        setBarData(barDataResponse.data);

        // Fetch pie chart data
        const pieDataResponse = await axios.get(
          `${apiBackend}/pie-chart/search?month=${monthName}`
        );
        console.log("pie data",pieDataResponse.data)
        setPieData(pieDataResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth, page]);

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    setSelectedMonth(monthIndex);
    setPage(1); 
  };

  return (
    <div className="w-11/12 h-full flex justify-center items-center flex-col py-8 ">
      <div className="rounded-full bg-white h-[250px] w-[250px] flex justify-center items-center">
        <p className="text-center text-zinc-600 font-bold text-3xl">
          Transactions Dashboard
        </p>
      </div>

      <select
        onChange={handleMonthChange}
        value={selectedMonth}
        className="w-42 h-8 bg-[#FFDA78] rounded-md px-6 my-4"
      >
        {monthNames.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>

      <TransactionsTable
        data={transactionsData}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        perPage={perPage}
      />
      <TransactionsStats statsData={statsData} selectedMonth={selectedMonth}/>
      <div className="w-full flex justify-between items-center bg-[#E2BEBE] mt-5">
       <BarChartComponent data={barData} selectedMonth={selectedMonth}/>
      <PieChartComponent data={pieData} selectedMonth={selectedMonth}/>
      </div>
    </div>
  );
};

export default Home;
