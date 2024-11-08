

// import React from "react";

// type MerchantCardProps = {
//   merchant: {
//     name: string;
//     location: string;
//     loanAmount: string;
//     merchantName: string;
//     description?: string;
//     contact?: number;
//     rateOfInterest: number;
//     timeDuration: number;
//   };
//   onApply: (name: string) => void;
// };

// const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, onApply }) => (
//   <div className="border rounded-lg p-6 shadow-lg mb-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
//     <h2 className="text-2xl font-semibold text-gray-800 mb-2">{merchant.name}</h2>
//     <p className="text-gray-600">
//       <span className="font-medium">Location:</span> {merchant.location}
//     </p>
//     <p className="text-gray-600">
//       <span className="font-medium">Loan Amount:</span> ₹{merchant.loanAmount}
//     </p>
//     {merchant.description && (
//       <p className="text-gray-600 mt-2 italic">{merchant.description}</p>
//     )}
//     {merchant.contact && (
//       <p className="text-gray-600 mt-2">
//         <span className="font-medium">Contact:</span> {merchant.contact}
//       </p>
//     )}
//     {merchant.rateOfInterest && (
//       <p className="text-gray-600 mt-2">
//         <span className="font-medium">Rate of Interest:</span> {merchant.rateOfInterest}%
//       </p>
//     )}
//     {merchant.timeDuration && (
//       <p className="text-gray-600 mt-2">
//         <span className="font-medium">Time Duration:</span> {merchant.timeDuration} months
//       </p>
//     )}

//     {/* Apply Button */}
//     <button
//       onClick={() => onApply(merchant.name)}
//       className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//     >
//       Apply
//     </button>
//   </div>
// );

// export default MerchantCard;






import React, { useState } from "react";

type MerchantCardProps = {
  merchant: {
    username?: string;
    location?: string;
    loanAmount?: string;
    merchantName?: string;
    description?: string;
    contact?: number;
    rateOfInterest?: number;
    timeDuration?: number;
  };
  onApply: (merchantName: string, loanAmount: string) => void;
};

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, onApply }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApplyClick = () => {
    if (loanAmount.trim() === "") {
      alert("Please enter a loan amount");
      return;
    }
    onApply(merchant?.username ?? "", loanAmount);
    setApplied(true);
  };

  return (
    <div className="border rounded-lg p-6 shadow-lg mb-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {merchant.username ?? "No Name Available"}
      </h2>
      <p className="text-gray-600">
        <span className="font-medium">Location:</span> {merchant.location ?? "N/A"}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Loan Amount:</span> ₹{merchant.loanAmount ?? "N/A"}
      </p>

      {/* Input for loan amount */}
      {!applied && (
        <>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            className="mt-4 border p-2 rounded w-full"
          />
          <button
            onClick={handleApplyClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Apply
          </button>
        </>
      )}
      {applied && (
        <p className="mt-4 text-green-600 font-semibold">Applied</p>
      )}
    </div>
  );
};

export default MerchantCard;
