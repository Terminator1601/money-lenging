

// import React, { useState } from "react";

// type MerchantCardProps = {
//   merchant: {
//     username?: string;
//     location?: string;
//     loanAmount?: string;
//     merchantName?: string;
//     description?: string;
//     contact?: number;
//     rateOfInterest?: number;
//     timeDuration?: number;
//   };
//   onApply: (merchantName: string, loanAmount: string) => void;
// };

// const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, onApply }) => {
//   const [loanAmount, setLoanAmount] = useState("");
//   const [applied, setApplied] = useState(false);

//   const handleApplyClick = () => {
//     if (loanAmount.trim() === "") {
//       alert("Please enter a loan amount");
//       return;
//     }
//     onApply(merchant?.username ?? "", loanAmount);
//     setApplied(true);
//   };

//   return (
//     <div className="border rounded-lg p-6 shadow-lg mb-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//         {merchant.username ?? "No Name Available"}
//       </h2>
//       <p className="text-gray-600">
//         <span className="font-medium">Location:</span> {merchant.location ?? "N/A"}
//       </p>
//       <p className="text-gray-600">
//         <span className="font-medium">Loan Amount:</span> ₹{merchant.loanAmount ?? "N/A"}
//       </p>

//       {/* Input for loan amount */}
//       {!applied && (
//         <>
//           <input
//             type="text"
//             value={loanAmount}
//             onChange={(e) => setLoanAmount(e.target.value)}
//             placeholder="Enter loan amount"
//             className="mt-4 border p-2 rounded w-full"
//           />
//           <button
//             onClick={handleApplyClick}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Apply
//           </button>
//         </>
//       )}
//       {applied && (
//         <p className="mt-4 text-green-600 font-semibold">Applied</p>
//       )}
//     </div>
//   );
// };

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
  onApply: (username: string, loanAmount: string) => Promise<boolean>;
};

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, onApply }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApplyClick = async () => {
    if (loanAmount.trim() === "") {
      alert("Please enter a loan amount");
      return;
    }

    setLoading(true);
    try {
      // Attempt to apply for the loan
      const success = await onApply(merchant.username ?? "", loanAmount);
      if (success) {
        setApplied(true);
        alert("Application successful!");
      } else {
        alert("Failed to apply for the loan. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for loan:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
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
      <p className="text-gray-600">
        <span className="font-medium">Rate of Interest:</span> {merchant.rateOfInterest ?? "N/A"}%
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Duration:</span> {merchant.timeDuration ?? "N/A"} months
      </p>

      {/* Input for loan amount and Apply button */}
      {!applied ? (
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
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </>
      ) : (
        <p className="mt-4 text-green-600 font-semibold">Application Sent</p>
      )}
    </div>
  );
};

export default MerchantCard;
