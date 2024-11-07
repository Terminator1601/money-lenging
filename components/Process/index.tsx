// components/Process.tsx
"use client";
import "tailwindcss/tailwind.css"
// components/Process.tsx
// "use client";
import React from "react";

const Process: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
        How it works
      </h2>
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Open an account in 5 minutes
      </h3>

      {/* Steps */}
      <div className="flex flex-wrap justify-center space-x-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-5xl font-bold text-gray-300">1</span>
          <h4 className="text-lg font-semibold text-gray-800 mt-2">Register</h4>
          <p className="text-gray-600 mt-1 max-w-xs">
            We only need your PAN card and an address proof
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-5xl font-bold text-gray-300">2</span>
          <h4 className="text-lg font-semibold text-gray-800 mt-2">
            Choose Borrower Category
          </h4>
          <p className="text-gray-600 mt-1 max-w-xs">
            Select your preferred borrowers based on risk categories, loan
            tenures and other parameters
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-5xl font-bold text-gray-300">3</span>
          <h4 className="text-lg font-semibold text-gray-800 mt-2">
            Deployment of Funds
          </h4>
          <p className="text-gray-600 mt-1 max-w-xs">
            Make a transfer and deploy into your selected borrowers
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-5xl font-bold text-gray-300">4</span>
          <h4 className="text-lg font-semibold text-gray-800 mt-2">
            Receive Repayment-Based Payout
          </h4>
          <p className="text-gray-600 mt-1 max-w-xs">
            You can re-lend by transferring your amount
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;
