import { useState, useEffect } from "react";
import axios from "axios";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import apiBackend from "./apiBackend";
import TransactionsTable from "./TransactionTable";
import TransactionsStats from "./TransactionsStats";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("2");
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const perPage = 10;

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthName = monthNames[selectedMonth];
        
        // Fetch transactions data with search query
        const transactionsResponse = await axios.get(
          `${apiBackend}/transactions/search?month=${monthName}&page=${page}&perPage=${perPage}&searchQuery=${searchQuery}`
        );
        setTransactionsData(transactionsResponse.data.transactions);
        setTotalPages(transactionsResponse.data.totalPages);

        // Fetch statistics, bar chart, and pie chart data
        const statsResponse = await axios.get(
          `${apiBackend}/statistics/search?month=${monthName}`
        );
        setStatsData(statsResponse.data);

        const barDataResponse = await axios.get(
          `${apiBackend}/barchart/search?month=${monthName}`
        );
        setBarData(barDataResponse.data);

        const pieDataResponse = await axios.get(
          `${apiBackend}/pie-chart/search?month=${monthName}`
        );
        setPieData(pieDataResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth, page, searchQuery]); // Add searchQuery to dependencies

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    setSelectedMonth(monthIndex);
    setPage(1); // Reset to first page on month change
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
    setPage(1); // Reset to page 1 on search change
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear search
    setPage(1); // Reset to page 1
  };

  return (
    <div className="w-11/12 h-full flex justify-center items-center flex-col py-8">
      <div className="rounded-full bg-white h-[250px] w-[250px] flex justify-center items-center">
        <p className="text-center text-zinc-600 font-bold text-3xl">Transactions Dashboard</p>
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

      <div className="w-full flex justify-between items-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Title, Description, Price"
          className="w-1/2 p-2 border rounded-md"
        />
        <button
          onClick={handleClearSearch}
          className="ml-2 bg-gray-300 p-2 rounded-md"
        >
          Clear
        </button>
      </div>

      <TransactionsTable
        data={transactionsData}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        perPage={perPage}
        searchQuery={searchQuery} // Pass searchQuery to table
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
