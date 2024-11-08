// components/ProfilePage.tsx
"use client";
import "tailwindcss/tailwind.css";
import ProfileDetail from "../../components/ProfileDetail";
import LoanApplied from "../../components/LoanApplied"
import React, { useState } from "react";
import Header from "../../components/Header";

// Sample components for each section on the right side
const ProfileDetails = () => <ProfileDetail />;
const LoansApplied = () => <LoanApplied/>;
const LoanHistory = () => <div>Loan History Content</div>;

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Profile Details");

  const renderSection = () => {
    switch (activeSection) {
      case "Profile Details":
        return <ProfileDetails />;
      case "Loans Applied":
        return <LoansApplied />;
      case "Loan History":
        return <LoanHistory />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <><Header/>
      <div className="max-w-5xl mx-auto py-8 px-4 flex space-x-4">
        {/* Left Side - 1/3 Section */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            My Account
          </h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("Profile Details")}
                className={`w-full text-left p-2 rounded-md ${
                  activeSection === "Profile Details"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Loans Applied")}
                className={`w-full text-left p-2 rounded-md ${
                  activeSection === "Loans Applied"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Loans Applied
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Loan History")}
                className={`w-full text-left p-2 rounded-md ${
                  activeSection === "Loan History"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Loan History
              </button>
            </li>
            {/* Add more sections here as needed */}
          </ul>
        </div>

        {/* Right Side - 2/3 Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeSection}
          </h2>
          <div>{renderSection()}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
