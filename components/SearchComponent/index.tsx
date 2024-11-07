// "use client";
// import React, { useState } from "react";
// import "tailwindcss/tailwind.css";

// type SearchComponentProps = {
//   onSearch: (searchData: { location: string; loanAmount: string; merchantName: string }) => void;
// };

// const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
//   const [location, setLocation] = useState("");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [merchantName, setMerchantName] = useState("");

//   const handleSearch = () => {
//     const searchData = {
//       location,
//       loanAmount,
//       merchantName,
//     };
//     onSearch(searchData);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white rounded-md shadow-md space-y-4">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Search for Loan Offers</h2>

//       <div className="flex space-x-4 items-center">
//         <div className="flex-1 space-y-1">
//           <label className="block text-gray-600 font-medium">Location</label>
//           <input
//             type="text"
//             placeholder="Enter location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div className="flex-1 space-y-1">
//           <label className="block text-gray-600 font-medium">Loan Amount</label>
//           <input
//             type="text"
//             placeholder="Enter loan amount"
//             value={loanAmount}
//             onChange={(e) => setLoanAmount(e.target.value)}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div className="flex-1 space-y-1">
//           <label className="block text-gray-600 font-medium">Merchant Name</label>
//           <input
//             type="text"
//             placeholder="Enter merchant name"
//             value={merchantName}
//             onChange={(e) => setMerchantName(e.target.value)}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <button
//           onClick={handleSearch}
//           className="self-end px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;



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
