
import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");

  const { handleResendVerificationEmail } = useAuth();
  const { loading, error,user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleResendVerificationEmail(email);
  };

  if (!loading && user) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#18181B] rounded-3xl shadow-2xl p-8 text-white">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center">
            <i className="ri-mail-send-line text-3xl text-violet-400"></i>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Enter your registered email address and we'll send you a new
          verification link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm mb-2">
              Email Address
            </label>

            <div className="flex items-center bg-[#1F1F23] border border-gray-700 rounded-xl px-4 h-14">
              <i className="ri-mail-line text-gray-400"></i>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            {loading ? "Sending..." : "Send Verification Email"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already verified?{" "}
          <Link
            to="/login"
            className="text-violet-400 hover:underline"
          >
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

