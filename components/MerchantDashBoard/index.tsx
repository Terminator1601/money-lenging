// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "universal-cookie";

// interface LoanApplication {
//   id: string;
//   applicantUsername: string;
//   loanAmount: string;
//   status: string;
// }

// const MerchantDashboard: React.FC = () => {
//   const [applications, setApplications] = useState<LoanApplication[]>([]);
//   const cookies = new Cookies();
//   const merchantName = cookies.get("username");

//   // Fetch loan applications for the logged-in merchant
//   const fetchApplications = async () => {
//     if (!merchantName) {
//       console.error("Merchant name not found in cookies.");
//       return;
//     }

//     try {
//       console.log("Fetching applications for merchant:", merchantName);
//       const response = await axios.post("http://localhost:5000/getMerchantLoans", {
//         merchantName,
//       });

//       if (response.status === 200) {
//         console.log("Applications fetched:", response.data);
//         setApplications(response.data);
//       } else {
//         console.error("Failed to fetch applications:", response);
//       }
//     } catch (error) {
//       console.error("Error fetching loan applications:", error);
//     }
//   };

//   // Handle Accept button click
//   const handleAccept = async (loanId: string) => {
//     try {
//       await axios.post("http://localhost:5000/updateLoanStatus", {
//         loanId,
//         status: "Accepted",
//       });
//       fetchApplications(); // Refresh the applications list
//     } catch (error) {
//       console.error("Error accepting loan:", error);
//     }
//   };

//   // Handle Reject button click
//   const handleReject = async (loanId: string) => {
//     try {
//       await axios.post("http://localhost:5000/updateLoanStatus", {
//         loanId,
//         status: "Rejected",
//       });
//       fetchApplications(); // Refresh the applications list
//     } catch (error) {
//       console.error("Error rejecting loan:", error);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [merchantName]);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Merchant Dashboard</h1>
//       {applications.length === 0 ? (
//         <p className="text-center">No loan applications found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {applications.map((application) => (
//             <div
//               key={application.id}
//               className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="text-xl font-semibold">Client: {application.applicantUsername}</h3>
//                 <p>Loan Amount: ₹{application.loanAmount}</p>
//                 <p>Status: {application.status}</p>
//               </div>
//               {application.status === "Pending" && (
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => handleAccept(application.id)}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleReject(application.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MerchantDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface LoanApplication {
  id: string;
  clientName: string;
  loanAmount: string;
  status: string;
  appliedAt: string;
}

const MerchantDashboard: React.FC = () => {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const cookies = new Cookies();
  const username = cookies.get("username");
  const role = cookies.get("role");

  const fetchApplications = async () => {
    const cookies = new Cookies();
    const username = cookies.get("username");
    const role = cookies.get("role");
  
    console.log("Fetching applications for merchant:", username);
  
    if (!username || role !== "merchant") {
      console.error("Merchant not logged in or role mismatch.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/getMerchantLoans", {
        merchantName: username.trim(),
      });
  
      console.log("API Response:", response);
  
      if (response.status === 200) {
        console.log("Applications fetched:", response.data);
        setApplications(response.data);
      } else {
        console.error("Failed to fetch applications:", response);
      }
    } catch (error) {
      console.error("Error fetching loan applications:", error);
    }
  };
  

  // Function to accept a loan application
  const handleAccept = async (loanId: string) => {
    try {
      await axios.post("http://localhost:5000/updateLoanStatus", {
        loanId,
        status: "Accepted",
      });
      fetchApplications(); // Refresh the applications list
    } catch (error) {
      console.error("Error accepting loan:", error);
    }
  };

  // Function to reject a loan application
  const handleReject = async (loanId: string) => {
    try {
      await axios.post("http://localhost:5000/updateLoanStatus", {
        loanId,
        status: "Rejected",
      });
      fetchApplications(); // Refresh the applications list
    } catch (error) {
      console.error("Error rejecting loan:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [username, role]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Merchant Dashboard</h1>
      {applications.length === 0 ? (
        <p className="text-center">No loan applications found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">Client: {application.clientName}</h3>
                <p>Loan Amount: ₹{application.loanAmount}</p>
                <p>Status: {application.status}</p>
                <p>Applied At: {new Date(application.appliedAt).toLocaleString()}</p>
              </div>
              {application.status === "Pending" && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAccept(application.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(application.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;
