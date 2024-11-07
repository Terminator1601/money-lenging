// // components/ProfileDetails.tsx
// import React from "react";
// import "tailwindcss/tailwind.css";

// type ProfileDetailsProps = {
//   firstName: string;
//   lastName: string;
//   employmentType: string;
//   monthlyIncome: string;
//   maritalStatus: string;
//   email: string;
//   mobileNumber: string;
// };

// const ProfileDetails: React.FC<ProfileDetailsProps> = ({
//   firstName,
//   lastName,
//   employmentType,
//   monthlyIncome,
//   maritalStatus,
//   email,
//   mobileNumber,
// }) => {
//   return (
//     <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">
//         Personal Information
//       </h3>
//       <div className="space-y-4">
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">First Name:</span>
//           <span className="text-gray-900 font-semibold">{firstName}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Last Name:</span>
//           <span className="text-gray-900 font-semibold">{lastName}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Employment Type:</span>
//           <span className="text-gray-900 font-semibold">{employmentType}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Monthly Income:</span>
//           <span className="text-gray-900 font-semibold">₹ {monthlyIncome}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Marital Status:</span>
//           <span className="text-gray-900 font-semibold">{maritalStatus}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Email:</span>
//           <span className="text-gray-900 font-semibold">{email}</span>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="font-medium text-gray-600">Mobile Number:</span>
//           <span className="text-gray-900 font-semibold">{mobileNumber}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDetails;

// components/ProfileDetails.tsx
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

type ProfileDetailsProps = {
  firstName: string;
  lastName: string;
  employmentType: string;
  monthlyIncome: string;
  maritalStatus: string;
  email: string;
  mobileNumber: string;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  firstName,
  lastName,
  employmentType,
  monthlyIncome,
  maritalStatus,
  email,
  mobileNumber,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    employmentType,
    monthlyIncome,
    maritalStatus,
    email,
    mobileNumber,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // You can add save functionality here (e.g., API call to save updated data)
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">
          Personal Information
        </h3>
        <button
          onClick={toggleEdit}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">First Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            />
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.firstName}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">Last Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            />
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.lastName}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">Employment Type:</span>
          {isEditing ? (
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            >
              <option value="Select">Select</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.employmentType}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">Monthly Income:</span>
          {isEditing ? (
            <input
              type="text"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            />
          ) : (
            <span className="text-gray-900 font-semibold">
              ₹ {formData.monthlyIncome}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">Marital Status:</span>
          {isEditing ? (
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            >
              <option value="Select">Select</option>

              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.maritalStatus}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-medium text-gray-600">Email:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            />
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.email}
            </span>
          )}
        </div>

        <div className="flex justify-between py-2">
          <span className="font-medium text-gray-600">Mobile Number:</span>
          {isEditing ? (
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            />
          ) : (
            <span className="text-gray-900 font-semibold">
              {formData.mobileNumber}
            </span>
          )}
        </div>
      </div>

      {/* Save Button - Only visible in edit mode */}
      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
