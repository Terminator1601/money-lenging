import React from "react";

type MerchantCardProps = {
  merchant: {
    name: string;
    location: string;
    loanAmount: string;
    merchantName: string;
    description?: string;
    contact?: number;
    rateOfInterest: number;
    timeDuration: number;
  };
};

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant }) => (
  <div className="border rounded-lg p-6 shadow-lg mb-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{merchant.name}</h2>
    <p className="text-gray-600">
      <span className="font-medium">Location:</span> {merchant.location}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Loan Amount:</span> ₹{merchant.loanAmount}
    </p>
    {merchant.description && (
      <p className="text-gray-600 mt-2 italic">{merchant.description}</p>
    )}
    {merchant.contact && (
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Contact:</span> {merchant.contact}
      </p>
    )}
    {merchant.rateOfInterest && (
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Rate of Interest:</span> {merchant.rateOfInterest}%
      </p>
    )}
    {merchant.timeDuration && (
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Time Duration:</span> {merchant.timeDuration} months
      </p>
    )}
  </div>
);

export default MerchantCard;
