import { Link } from "react-router-dom";

const VerificationEmailSent = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-4 space-y-6 bg-white w-96">
        <h1 className="text-2xl text-center font-bold p-2 text-gray-700">
          Verfication Email Sent
        </h1>
        <div className="space-y-5 mt-8">
          <p className="text-sm">
            Verification email has been sent. If you&#39;ve haven&#39;t received
            yet. Please click resend.
          </p>
          <Link
            className="font-medium p-2 text-center w-full block outline-none outline-indigo-500 border-indigo-700"
            to="/"
          >
            Go to Home
          </Link>
          <button className="font-medium p-2 w-full block border-indigo-500 bg-indigo-500 text-white">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmailSent;
