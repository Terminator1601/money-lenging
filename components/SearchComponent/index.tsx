

"use client"
import "tailwindcss/tailwind.css"
import React, { useState } from "react";
import axios from "axios";

type SearchComponentProps = {
  onResults: (results: any[]) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ onResults }) => {
  const [searchData, setSearchData] = useState({
    location: "",
    loanAmount: "",
    merchantName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/searchMerchants", {
        params: searchData,
      });
      onResults(response.data); // Pass results to parent component
    } catch (error) {
      console.error("Error fetching merchant data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input
        type="text"
        name="location"
        value={searchData.location}
        onChange={handleChange}
        placeholder="Location"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="loanAmount"
        value={searchData.loanAmount}
        onChange={handleChange}
        placeholder="Loan Amount"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="merchantName"
        value={searchData.merchantName}
        onChange={handleChange}
        placeholder="Merchant Name"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
