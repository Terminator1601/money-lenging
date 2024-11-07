// // components/AuthForm.tsx
// "use client";
// import "tailwindcss/tailwind.css"
// import React, { useState } from "react";
// import { getDocs, addDoc, query, where, collection } from "firebase/firestore";
// import { db } from "../../Firebase/config";
// import Cookies from "universal-cookie";
// import Captcha from "../Captcha";

// type UserData = {
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   captcha: string;
//   enteredCaptcha: string;
// //   status: string;
// };

// interface AuthFormProps {
//   role: "client" | "merchant";
//   collectionName: string;
// }

// const AuthForm: React.FC<AuthFormProps> = ({ role, collectionName }) => {
//   const [formData, setFormData] = useState<UserData>({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     captcha: "",
//     enteredCaptcha: "",
//     // status: "offline",
//   });
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const cookies = new Cookies();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSuccessfulLogin = (userData: UserData) => {
//     setIsLoggedIn(true);
//     setUsername(userData.username);

//     // Set cookies for username, email, and role after successful login
//     cookies.set("username", userData.username, { path: "/" });
//     cookies.set("email", userData.email, { path: "/" });
//     cookies.set("role", role, { path: "/" }); // Store role as client or merchant

//     // setFormData((prevData) => ({ ...prevData, status: "online" }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (formData.captcha !== formData.enteredCaptcha) {
//         throw new Error("Invalid captcha");
//       }

//       // Check if the user exists with the provided email
//       const userQuery = query(
//         collection(db, collectionName),
//         where("email", "==", formData.email)
//       );
//       const userSnapshot = await getDocs(userQuery);

//       if (!isLoginMode) {
//         // Registration logic
//         if (userSnapshot.docs.length > 0) {
//           throw new Error("Email already registered. Please log in.");
//         }

//         const newUser = {
//           email: formData.email,
//           username: formData.username,
//           password: formData.password,
//           phone: formData.phone,
//         //   status: "online",
//         };

//         // Add the new user to the specified collection
//         await addDoc(collection(db, collectionName), newUser);

//         console.log("Registration successful!");
//         window.alert(`Registration successful! Please log in.`);
//         toggleMode();
//       } else {
//         // Login logic
//         if (userSnapshot.empty) {
//           throw new Error("Email not registered. Please register.");
//         }

//         const userData = userSnapshot.docs[0].data() as UserData;
//         if (userData.password !== formData.password) {
//           throw new Error("Invalid password");
//         }

//         console.log("Login successful!");
//         window.alert(`Welcome ${userData.username}! Login successful!`);
//         handleSuccessfulLogin(userData);
//       }
//     } catch (error: any) {
//       console.error(`Error during login/registration:`, error);
//       window.alert(`Error during login/registration: ${error.message}`);
//       if (error.message === "Email not registered. Please register.") {
//         setIsLoginMode(false);
//       }
//     }
//   };

//   const toggleMode = () => {
//     setIsLoginMode((prevMode) => !prevMode);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
//       {isLoggedIn ? (
//         <>
//           <p className="text-xl font-semibold mb-4">
//             Welcome {username}! You are logged in.
//           </p>
//           <button
//             onClick={() => (window.location.href = "/")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Go to Home Page
//           </button>
//         </>
//       ) : (
//         <>
//           <h2 className="text-2xl font-semibold mb-4">
//             {isLoginMode ? `${role} Login` : `${role} Registration`} Form
//           </h2>
//           <label className="block mb-2">
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border rounded-md"
//             />
//           </label>
//           {!isLoginMode && (
//             <>
//               <label className="block mb-2">
//                 Username:
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="block w-full mt-1 p-2 border rounded-md"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Phone:
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="block w-full mt-1 p-2 border rounded-md"
//                 />
//               </label>
//             </>
//           )}
//           <label className="block mb-2">
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border rounded-md"
//             />
//           </label>
//           <Captcha
//             captcha={formData.captcha}
//             enteredCaptcha={formData.enteredCaptcha}
//             setFormData={setFormData}
//           />
//           <div className="flex space-x-4">
//             <button
//               onClick={handleSubmit}
//               className={`flex-1 ${
//                 isLoginMode ? "bg-green-500" : "bg-blue-500"
//               } text-white px-4 py-2 rounded-md hover:${
//                 isLoginMode ? "bg-green-600" : "bg-blue-600"
//               }`}
//             >
//               {isLoginMode ? "Login" : "Register"}
//             </button>
//           </div>
//           <p className="mt-2">
//             {isLoginMode ? `New ${role}? ` : "Already have an account? "}
//             <button
//               onClick={toggleMode}
//               className="text-blue-500 hover:underline focus:outline-none"
//             >
//               {isLoginMode ? "Register here" : "Login here"}
//             </button>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthForm;










"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Captcha from "../Captcha";

type UserData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  captcha: string;
  enteredCaptcha: string;
};

interface AuthFormProps {
  role: "client" | "merchant";
}

const AuthForm: React.FC<AuthFormProps> = ({ role }) => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    captcha: "",
    enteredCaptcha: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const cookies = new Cookies();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessfulLogin = (userData: UserData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    cookies.set("username", userData.username, { path: "/" });
    cookies.set("email", userData.email, { path: "/" });
    cookies.set("role", role, { path: "/" });
  };

  const handleSubmit = async () => {
    try {
      if (formData.captcha !== formData.enteredCaptcha) {
        throw new Error("Invalid captcha");
      }

      const endpoint = isLoginMode ? "/login" : "/register";
      const apiUrl = `http://localhost:5000${endpoint}`;

      const response = await axios.post(apiUrl, {
        ...formData,
        role,
      });

      if (isLoginMode) {
        handleSuccessfulLogin(response.data);
        alert(`Welcome ${response.data.username}!`);
      } else {
        alert("Registration successful! Please log in.");
        setIsLoginMode(true); // Switch to login mode after registration
      }
    } catch (error: any) {
      console.error("Error during login/registration:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      {isLoggedIn ? (
        <p className="text-xl font-semibold mb-4">Welcome {username}! You are logged in.</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            {isLoginMode ? `${role} Login` : `${role} Registration`} Form
          </h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded-md mb-2"
            placeholder="Email"
          />
          {!isLoginMode && (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-md mb-2"
                placeholder="Username"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-md mb-2"
                placeholder="Phone"
              />
            </>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded-md mb-2"
            placeholder="Password"
          />
          <Captcha
            captcha={formData.captcha}
            enteredCaptcha={formData.enteredCaptcha}
            setFormData={setFormData}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
          <p className="mt-4">
            {isLoginMode ? `New ${role}? ` : "Already have an account? "}
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-blue-500 hover:underline"
            >
              {isLoginMode ? "Register here" : "Login here"}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthForm;
