
"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Captcha from "../Captcha";
// components/AuthForm.tsx

type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  captcha: string;
  enteredCaptcha: string;
};

interface AuthFormProps {
  role: "client" | "merchant";
  collectionName: string; // Added collectionName to the props
}

const AuthForm: React.FC<AuthFormProps> = ({ role, collectionName }) => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    firstName: "",
    lastName: "",
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
  
    // Store username, email, and role in cookies
    cookies.set("username", userData.username, { path: "/" });
    cookies.set("email", userData.email, { path: "/" });
    cookies.set("role", role, { path: "/" }); // Store the role as well
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
        collectionName, // Send collectionName with the request
      });

      if (isLoginMode) {
        handleSuccessfulLogin(response.data);
        alert(`Welcome ${response.data.username}!`);
      } else {
        alert("Registration successful! Please log in.");
        setIsLoginMode(true);
      }
    } catch (error: any) {
      console.error("Error during login/registration:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      {isLoggedIn ? (
        <p className="text-xl font-semibold mb-4">
          Welcome {username}! You are logged in.
        </p>
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-md mb-2"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-md mb-2"
                placeholder="Last Name"
              />
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
