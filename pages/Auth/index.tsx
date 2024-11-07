// "use client";
// import "tailwindcss/tailwind.css";
// import { useState } from "react";
// import { auth, db } from "../Firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "client",
//   });

//   const handleToggle = () => {
//     setIsLogin(!isLogin);
//     setFormData({ email: "", password: "", role: "client" });
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   const handleSignup = async () => {
//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       const user = userCredential.user;

//       // Store additional user info in Firestore
//       const roleCollection = formData.role === "client" ? "Clients" : "Merchants";
//       await setDoc(doc(db, roleCollection, user.uid), {
//         email: formData.email,
//         role: formData.role,
//       });

//       alert("User signed up successfully!");
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (isLogin) {
//       // Handle login logic here
//     } else {
//       handleSignup();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isLogin ? "Login" : "Signup"}
//         </h2>
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
//               Role
//             </label>
//             <select
//               id="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="client">Client</option>
//               <option value="merchant">Merchant</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className={`w-full px-4 py-2 text-white rounded-md ${
//               isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {isLogin ? "Login" : "Signup"}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button onClick={handleToggle} className="text-blue-500 hover:underline focus:outline-none">
//             {isLogin ? "Sign up" : "Log in"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;

"use client";
import "tailwindcss/tailwind.css";

import { getDocs, addDoc, query, where, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase/config"; // Ensure this path matches your project structure
import crypto from "crypto";
import Cookies from "universal-cookie";

type UserData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  captcha: string;
  enteredCaptcha: string;
  status: string;
};

const index: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    captcha: "",
    enteredCaptcha: "",
    status: "offline",
  });

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const cookies = new Cookies(); // Create a cookies instance

  const generateCaptcha = () => {
    const captcha = crypto.randomBytes(3).toString("hex");
    setFormData({ ...formData, captcha, enteredCaptcha: "" });
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessfulLogin = (userData: UserData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);

    // Set cookies after successful login
    cookies.set("username", userData.username, { path: "/" });
    cookies.set("email", userData.email, { path: "/" });

    setFormData((prevData) => ({ ...prevData, status: "online" }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.captcha !== formData.enteredCaptcha) {
        throw new Error("Invalid captcha");
      }

      // Check if the user exists with the provided email
      const userQuery = query(
        collection(db, "userData"),
        where("email", "==", formData.email)
      );
      const userSnapshot = await getDocs(userQuery);

      // Registration logic
      if (!isLoginMode) {
        if (userSnapshot.docs.length > 0) {
          throw new Error("Email already registered. Please log in.");
        }

        const newUser = {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          status: "online",
        };

        // Add the new user to the database
        await addDoc(collection(db, "userData"), newUser);

        console.log("Registration successful!");
        window.alert(`Registration successful! Please log in.`);
        toggleMode(); // Switch to the login mode after successful registration
      } else {
        // Login logic
        if (userSnapshot.empty) {
          throw new Error("Email not registered. Please register.");
        }

        const userData = userSnapshot.docs[0].data() as UserData;
        if (userData.password !== formData.password) {
          throw new Error("Invalid password");
        }

        console.log("Login successful!");
        window.alert(`Welcome ${userData.username}! Login successful!`);
        handleSuccessfulLogin(userData);
      }
    } catch (error: any) {
      console.error(`Error during login/registration:`, error);
      window.alert(`Error during login/registration: ${error.message}`);
      if (error.message === "Email not registered. Please register.") {
        setIsLoginMode(false);
      }
    } finally {
      generateCaptcha();
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    generateCaptcha();
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      {isLoggedIn ? (
        <>
          <p className="text-xl font-semibold mb-4">
            Welcome {username}! You are logged in.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Go to Home Page
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            {isLoginMode ? "Login" : "Registration"} Form
          </h2>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          {!isLoginMode && (
            <>
              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </>
          )}
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Captcha: {formData.captcha}
            <input
              type="text"
              name="enteredCaptcha"
              value={formData.enteredCaptcha}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className={`flex-1 ${
                isLoginMode ? "bg-green-500" : "bg-blue-500"
              } text-white px-4 py-2 rounded-md hover:${
                isLoginMode ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {isLoginMode ? "Login" : "Register"}
            </button>
            <button
              onClick={handleRefreshCaptcha}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Refresh Captcha
            </button>
          </div>
          <p className="mt-2">
            {isLoginMode ? "New user? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isLoginMode ? "Register here" : "Login here"}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default index;
