
// "use client";
// import "tailwindcss/tailwind.css";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import LoginSignupPopup from "../LoginSignupPopup";
// import Cookies from "universal-cookie";

// const Header: React.FC = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);

//   const openPopup = () => setIsPopupOpen(true);
//   const closePopup = () => setIsPopupOpen(false);
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   useEffect(() => {
//     const cookies = new Cookies();
//     const storedUsername = cookies.get("username"); // Fetch username from cookies
//     setUsername(storedUsername || null); // Set username if available
//   }, []);

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Company Name */}
//         <Link href="/" className="text-2xl font-bold text-blue-600">
//           MoneyLending
//         </Link>

//         {/* Navigation Links */}
//         <nav className="flex space-x-6 text-gray-700 font-medium relative">
//           <Link href="/about" className="hover:text-blue-600">
//             About
//           </Link>

//           {/* Lending Dropdown with Symbol and Hover */}
//           <div className="relative group">
//             <button className="flex items-center space-x-1 hover:text-blue-600 focus:outline-none">
//               <span>Loans</span>
//               {/* Dropdown Icon */}
//               <svg
//                 className="w-4 h-4 text-gray-700 group-hover:text-blue-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             {/* Dropdown Menu */}
//             <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition duration-150 ease-in-out z-10">
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Instant Personal Loan
//               </Link>
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Short Term Loan
//               </Link>
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Marriage Loan
//               </Link>
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Debt Consolidation Loan
//               </Link>
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Credit Card Repayment Loan
//               </Link>
//               <Link
//                 href="/Loans"
//                 className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//               >
//                 Small Personal Loan
//               </Link>
//             </div>
//           </div>

//           <Link href="/Lending" className="hover:text-blue-600">
//             Lending
//           </Link>
//           <Link href="/partner" className="hover:text-blue-600">
//             Partner
//           </Link>
//           <Link href="/careers" className="hover:text-blue-600">
//             Careers
//           </Link>
//           <Link href="/faq" className="hover:text-blue-600">
//             FAQ
//           </Link>
//         </nav>

//         {/* Login, Sign Up, and Profile Section */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={openPopup}
//             className="text-gray-700 font-medium hover:text-blue-600"
//           >
//             Login / Sign Up
//           </button>

//           {/* Profile Icon with Dropdown */}
//           <div className="relative">
//             <button
//               onClick={toggleProfileDropdown}
//               className="flex items-center focus:outline-none space-x-2"
//             >
//               {/* Profile Icon */}
//               <svg
//                 className="w-6 h-6 text-gray-700 hover:text-blue-600"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.7 0-7 1.9-7 5v1h14v-1c0-3.1-3.3-5-7-5z" />
//               </svg>
//               {username && (
//                 <span className="text-gray-700 font-medium">{username}</span>
//               )}
//             </button>

//             {isProfileDropdownOpen && (
//               <div
//                 className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
//                 onMouseLeave={() => setIsProfileDropdownOpen(false)}
//               >
//                 <Link
//                   href="/Profile"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   href="/settings"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//                 >
//                   Settings
//                 </Link>
//                 <Link
//                   href="/wallet"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//                 >
//                   Wallet
//                 </Link>
//                 <Link
//                   href="/logout"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
//                 >
//                   Logout
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popup Component */}
//       <LoginSignupPopup isOpen={isPopupOpen} onClose={closePopup} />
//     </header>
//   );
// };

// export default Header;














"use client";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoginSignupPopup from "../LoginSignupPopup";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Header: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter(); // Initialize router for navigation

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const cookies = new Cookies();
    const storedUsername = cookies.get("username"); // Fetch username from cookies
    setUsername(storedUsername || null); // Set username if available
  }, []);

  // Handle Logout: Remove the cookie and navigate to home
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("username", { path: "/" }); // Remove the username cookie
    setUsername(null); // Clear username from state
    setIsProfileDropdownOpen(false); // Close profile dropdown
    router.push("/"); // Navigate to the home page
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Company Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MoneyLending
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-700 font-medium relative">
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          {/* Loans Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-blue-600 focus:outline-none">
              <span>Loans</span>
              <svg
                className="w-4 h-4 text-gray-700 group-hover:text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition duration-150 ease-in-out z-10">
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Instant Personal Loan
              </Link>
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Short Term Loan
              </Link>
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Marriage Loan
              </Link>
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Debt Consolidation Loan
              </Link>
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Credit Card Repayment Loan
              </Link>
              <Link href="/Loans" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                Small Personal Loan
              </Link>
            </div>
          </div>

          <Link href="/Lending" className="hover:text-blue-600">
            Lending
          </Link>
          <Link href="/partner" className="hover:text-blue-600">
            Partner
          </Link>
          <Link href="/careers" className="hover:text-blue-600">
            Careers
          </Link>
          <Link href="/faq" className="hover:text-blue-600">
            FAQ
          </Link>
        </nav>

        {/* Login, Sign Up, and Profile Section */}
        <div className="flex items-center space-x-4">
          <button onClick={openPopup} className="text-gray-700 font-medium hover:text-blue-600">
            Login / Sign Up
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center focus:outline-none space-x-2"
            >
              <svg className="w-6 h-6 text-gray-700 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.7 0-7 1.9-7 5v1h14v-1c0-3.1-3.3-5-7-5z" />
              </svg>
              {username && <span className="text-gray-700 font-medium">{username}</span>}
            </button>

            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <Link href="/Profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Settings
                </Link>
                <Link href="/wallet" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Wallet
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <LoginSignupPopup isOpen={isPopupOpen} onClose={closePopup} />
    </header>
  );
};

export default Header;
