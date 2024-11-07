// components/Captcha.tsx
import React, { Dispatch, SetStateAction, useEffect } from "react";
import crypto from "crypto";

interface CaptchaProps {
  captcha: string;
  enteredCaptcha: string;
  setFormData: Dispatch<SetStateAction<any>>;
}

const index: React.FC<CaptchaProps> = ({ captcha, enteredCaptcha, setFormData }) => {
  const generateCaptcha = () => {
    const newCaptcha = crypto.randomBytes(3).toString("hex");
    setFormData((prevData: any) => ({ ...prevData, captcha: newCaptcha, enteredCaptcha: "" }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="mb-4">
      <label className="block mb-2">
        Captcha: {captcha}
        <input
          type="text"
          name="enteredCaptcha"
          value={enteredCaptcha}
          onChange={(e) => setFormData((prevData: any) => ({ ...prevData, enteredCaptcha: e.target.value }))}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <button
        onClick={generateCaptcha}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
      >
        Refresh Captcha
      </button>
    </div>
  );
};

export default index;
