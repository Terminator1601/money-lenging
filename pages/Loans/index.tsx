// components/LoanApplicationForm.tsx
"use client";
import "tailwindcss/tailwind.css"
import React, { useState } from "react";

const LoanApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    purposeOfLoan: "",
    loanDuration: "",
    title: "Male",
    firstName: "",
    lastName: "",
    employmentType: "",
    monthlyIncome: "",
    monthlyEMI: "",
    maritalStatus: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Loan Application Form</h2>

      {/* Loan Amount */}
      <div>
        <label htmlFor="loanAmount" className="block text-gray-700 font-medium">Loan Amount</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          min="1000"
          max="1000000"
          placeholder="₹ 1000 to ₹ 10,00,000"
          value={formData.loanAmount}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Purpose Of Loan */}
      <div>
        <label htmlFor="purposeOfLoan" className="block text-gray-700 font-medium">Purpose Of Loan</label>
        <select
          id="purposeOfLoan"
          name="purposeOfLoan"
          value={formData.purposeOfLoan}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">-- Please select an option --</option>
          <option value="personal">Personal Loan</option>
          <option value="education">Education Loan</option>
          <option value="medical">Medical Loan</option>
          <option value="home">Home Loan</option>
          <option value="business">Business Loan</option>
        </select>
      </div>

      {/* Loan Duration */}
      <div>
        <label htmlFor="loanDuration" className="block text-gray-700 font-medium">Loan Duration</label>
        <select
          id="loanDuration"
          name="loanDuration"
          value={formData.loanDuration}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">-- Please select an option --</option>
          <option value="6months">6 Months</option>
          <option value="12months">12 Months</option>
          <option value="24months">24 Months</option>
          <option value="36months">36 Months</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-gray-700 font-medium">Title</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="title"
              value="Male"
              checked={formData.title === "Male"}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="title"
              value="Female"
              checked={formData.title === "Female"}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="title"
              value="Other"
              checked={formData.title === "Other"}
              onChange={handleChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-gray-700 font-medium">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-gray-700 font-medium">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Employment Type */}
      <div>
        <label htmlFor="employmentType" className="block text-gray-700 font-medium">Employment Type</label>
        <select
          id="employmentType"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">-- Please select an option --</option>
          <option value="salaried">Salaried</option>
          <option value="selfEmployed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
        </select>
      </div>

      {/* Monthly Income */}
      <div>
        <label htmlFor="monthlyIncome" className="block text-gray-700 font-medium">Monthly Income</label>
        <input
          type="number"
          id="monthlyIncome"
          name="monthlyIncome"
          placeholder="Your Monthly Income"
          value={formData.monthlyIncome}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Monthly EMI */}
      <div>
        <label htmlFor="monthlyEMI" className="block text-gray-700 font-medium">Monthly EMI</label>
        <input
          type="number"
          id="monthlyEMI"
          name="monthlyEMI"
          placeholder="Your Monthly EMI"
          value={formData.monthlyEMI}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Marital Status */}
      <div>
        <label htmlFor="maritalStatus" className="block text-gray-700 font-medium">Marital Status</label>
        <select
          id="maritalStatus"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">-- Please select an option --</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
        </select>
      </div>

      {/* Email ID */}
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium">Email ID</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium">Create your password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label htmlFor="mobileNumber" className="block text-gray-700 font-medium">Mobile Number</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Your mobile number"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 mt-4 rounded-md hover:bg-blue-700">
        Submit Application
      </button>
    </form>
  );
};

export default LoanApplicationForm;
