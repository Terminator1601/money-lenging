import React, { useState } from "react";
import SearchComponent from "../../components/SearchComponent";
import MerchantCard from "../../components/MerchantCard";

const ParentComponent = () => {
  const [results, setResults] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        User Loan Search
      </h1>
      <div className="max-w-4xl mx-auto px-4">
        <SearchComponent onResults={setResults} />
        <div className="mt-8 grid grid-cols-1 gap-6">
          {results.length > 0 ? (
            results.map((merchant, index) => (
              <MerchantCard key={index} merchant={merchant} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              No results found. Try adjusting your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
