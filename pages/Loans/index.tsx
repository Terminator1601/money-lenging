// import React, { useState } from "react";
// import SearchComponent from "../../components/SearchComponent";
// import MerchantCard from "../../components/MerchantCard";
// import Header from "../../components/Header";

// const ParentComponent = () => {
//   const [results, setResults] = useState<any[]>([]);

//   // Handle the Apply button click
//   const handleApply = (name: string) => {
//     alert(`You have applied to ${name}!`);
//     // Here you can add further logic, such as making an API call to register the application.
//   };

//   return (
//     <>
//     <Header/>
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           User Loan Search
//         </h1>
//         <SearchComponent onResults={setResults} />
//         <div className="mt-8">
//           {results.map((merchant, index) => (
//             <MerchantCard
//               key={index}
//               merchant={merchant}
//               onApply={handleApply}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ParentComponent;




import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import SearchComponent from "../../components/SearchComponent";
import MerchantCard from "../../components/MerchantCard";
import Header from "../../components/Header";

const ParentComponent = () => {
  const [results, setResults] = useState<any[]>([]);
  const cookies = new Cookies();

  // Fetch user details from cookies
  const applicantUsername = cookies.get("username");
  const applicantEmail = cookies.get("email");
  const applicantRole = cookies.get("role");
  const handleApply = async (username: string, loanAmount: string) => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        applicantUsername,
        applicantEmail,
        loanAmount,
        username,
        applicantRole,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error applying for loan:", error);
      return false;
    }
  };
  

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          User Loan Search
        </h1>
        <SearchComponent onResults={setResults} />
        <div className="mt-8">
          {results.map((merchant, index) => (
            <MerchantCard
              key={index}
              merchant={merchant}
              onApply={handleApply}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ParentComponent;
