// "use client";
// import React, { useState, useEffect } from "react";
// import "tailwindcss/tailwind.css";
// import Cookies from "universal-cookie";
// import axios from "axios";

// const ProfileDetails: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     employmentType: "",
//     monthlyIncome: "",
//     maritalStatus: "",
//     email: "",
//     mobileNumber: "",
//   });
//   const [username, setUsername] = useState<string | null>(null); // State to store username
//   const [loading, setLoading] = useState(true); // Loading state for data fetch

//   // Handle changes in form fields
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Toggle editing mode
//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   // Save profile changes to the backend
//   const handleSave = async () => {
//     if (!username || !formData.email) return;

//     try {
//       const response = await axios.post("http://localhost:5000/updateProfile", {
//         username,
//         userData: formData,
//       });

//       if (response.status === 200) {
//         alert("Profile updated successfully!");
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   // Fetch profile data from backend after component mounts
//   useEffect(() => {
//     // Ensure code only runs on the client side
//     const cookies = new Cookies();
//     const storedUsername = cookies.get("username");
//     const storedEmail = cookies.get("email");

//     if (storedUsername && storedEmail) {
//       setUsername(storedUsername);
//       setFormData((prevData) => ({ ...prevData, email: storedEmail }));

//       // Fetch user profile data from the backend
//       axios
//         .get(`http://localhost:5000/getProfile`, {
//           params: { username: storedUsername },
//         })
//         .then((response) => {
//           if (response.data) {
//             setFormData(response.data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         })
//         .finally(() => setLoading(false)); // Stop loading when fetch completes
//     } else {
//       setLoading(false); // Stop loading if no username is found
//     }
//   }, []);

//   // If loading, show a loading message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg">
//       <div className="flex justify-between items-center">
//         <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">
//           Personal Information
//         </h3>
//         <button
//           onClick={toggleEdit}
//           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
//         >
//           {isEditing ? "Cancel" : "Edit"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">User Name:</span>
//           <span className="text-gray-900 font-semibold">{username}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">First Name:</span>
//           {isEditing ? (
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             />
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.firstName}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Last Name:</span>
//           {isEditing ? (
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             />
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.lastName}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Employment Type:</span>
//           {isEditing ? (
//             <select
//               name="employmentType"
//               value={formData.employmentType}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             >
//               <option value="Select">Select</option>
//               <option value="Salaried">Salaried</option>
//               <option value="Self-Employed">Self-Employed</option>
//               <option value="Unemployed">Unemployed</option>
//             </select>
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.employmentType}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Monthly Income:</span>
//           {isEditing ? (
//             <input
//               type="text"
//               name="monthlyIncome"
//               value={formData.monthlyIncome}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             />
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               ₹ {formData.monthlyIncome}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Marital Status:</span>
//           {isEditing ? (
//             <select
//               name="maritalStatus"
//               value={formData.maritalStatus}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             >
//               <option value="Select">Select</option>
//               <option value="Single">Single</option>
//               <option value="Married">Married</option>
//               <option value="Divorced">Divorced</option>
//             </select>
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.maritalStatus}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2 border-b">
//           <span className="font-medium text-gray-600">Email:</span>
//           {isEditing ? (
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             ></input>
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.email}
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between py-2">
//           <span className="font-medium text-gray-600">Mobile Number:</span>
//           {isEditing ? (
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
//             />
//           ) : (
//             <span className="text-gray-900 font-semibold">
//               {formData.mobileNumber}
//             </span>
//           )}
//         </div>
//       </div>

//       {isEditing && (
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDetails;







"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Cookies from "universal-cookie";
import axios from "axios";

const ProfileDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employmentType: "",
    monthlyIncome: "",
    maritalStatus: "",
    email: "",
    mobileNumber: "",
  });
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!username || !formData.email) return;
  
    try {
      const response = await axios.post("http://localhost:5000/updateProfile", {
        username,
        email: formData.email,
        userData: formData,
      });
  
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  

  useEffect(() => {
    const cookies = new Cookies();
    const storedUsername = cookies.get("username");
    const storedEmail = cookies.get("email");

    if (storedUsername && storedEmail) {
      setUsername(storedUsername);
      setFormData((prevData) => ({ ...prevData, email: storedEmail }));

      axios
        .get("http://localhost:5000/getProfile", { params: { username: storedUsername } })
        .then((response) => {
          if (response.data) {
            setFormData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <span className="font-medium text-gray-600">User Name:</span>
          <span className="text-gray-900 font-semibold">{username}</span>
        </div>
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-1/2 p-1 border rounded-md text-gray-900 font-semibold"
            ></input>
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
