import { useState, useEffect } from "react";
import axios from "axios";
import apiBackend from "./apiBackend";

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

const TransactionsStats = ({ statsData, selectedMonth }) => {
  const monthName = monthNames[selectedMonth];

  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 bg-[#FFDA78]">
      <p className="text-xl font-bold">Statistics for {monthName}</p>
      {statsData ? (
        <div className="px-8 py-4 w-96 rounded-md ">
          <div className="flex justify-between items-center">
            <p className="font-semiBold text-xl">Total Sale Amount: </p>
            <span className="text-xl font-normal">
              ${statsData.totalSaleAmount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semiBold text-xl"> 
              Total Sold Items: 
            </p>
            <span className="text-xl font-normal">
              {statsData.totalSoldItems}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semiBold text-xl">
              Total Not Sold Items: 
            </p>
            <span className="text-xl font-normal">
              {statsData.totalNotSoldItems}
            </span>
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default TransactionsStats;
