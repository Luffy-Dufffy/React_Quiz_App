import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../services/auth";
import { useState } from "react";

const VerifyEmail = () => {

  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailVerification = (token) => {
    verificationMsg = verifyEmail(token);
    if (verificationMsg.error) {
      setError(verificationMsg.message);
      setVerified(false);
      // console.log(`verified: ${verified}`);
      return;
    }
    setError(null);
    setVerified(true);
    navigate('/login');
    // console.log(`verified: ${verified}`);
  }
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-4 space-y-6 bg-white w-96">
        <h1 className="text-2xl text-center font-bold p-2 text-gray-700">
          Verify Email
        </h1>
        <div className="space-y-7 mt-8">
          <p className="text-sm">Please verify your email.</p>
          <button className="p-2 w-full border bg-indigo-500 text-white" onClick={() => handleEmailVerification(token)}>
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
