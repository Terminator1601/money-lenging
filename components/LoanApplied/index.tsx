import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface Loan {
  id: string;
  merchantName: string;
  appliedAt: string;
  status: string;
  loanAmount: string;
}

const LoanApplied = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const cookies = new Cookies();

  // Fetch user details from cookies
  const username = cookies.get("username");
  const email = cookies.get("email");
  const role = cookies.get("role");

  // Fetch loan applications for the logged-in user
  const fetchLoanApplications = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getLoans", {
        username,
        email,
        role,
      });
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loan applications:", error);
      alert("Failed to fetch loan applications.");
    }
  };

  // Withdraw loan application
  const handleWithdraw = async (loanId: string) => {
    try {
      await axios.post("http://localhost:5000/withdrawLoan", { loanId });
      alert("Loan application withdrawn successfully!");
      fetchLoanApplications(); // Refresh the list after withdrawing
    } catch (error) {
      console.error("Error withdrawing loan:", error);
      alert("Failed to withdraw loan.");
    }
  };

  // Fetch loans when the component mounts
  useEffect(() => {
    if (username && email && role) {
      fetchLoanApplications();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        My Loan Applications
      </h1>
      {loans.length === 0 ? (
        <p className="text-center">No loan applications found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Merchant Name</th>
              <th className="border p-2">Date of Apply</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Loan Amount</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="border p-2">{loan.merchantName}</td>
                <td className="border p-2">
                  {loan.appliedAt
                    ? new Date(loan.appliedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="border p-2">{loan.status}</td>
                <td className="border p-2">₹{loan.loanAmount}</td>
                <td className="border p-2">
                  {loan.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleWithdraw(loan.id)}
                    >
                      Withdraw
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanApplied;
