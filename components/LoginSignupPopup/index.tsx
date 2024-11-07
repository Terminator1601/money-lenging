// components/LoginSignupPopup.tsx
"use client";
import "tailwindcss/tailwind.css";
import React from "react";
import Link from "next/link";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Choose Your Role
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Are you logging in or signing up as a Client or Merchant?
        </p>

        <div className="flex flex-col space-y-4">
          {/* Client Login and Signup */}
          <Link href="Auth/Client/" className="w-full">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
              Client
            </button>
          </Link>

          {/* Merchant Login and Signup */}
          <Link href="Auth/Merchant" className="w-full">
            <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700">
              Merchant
            </button>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginSignupPopup;
