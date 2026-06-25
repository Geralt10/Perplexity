
import { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
    });

    // Dummy API Call
    // axios.post("/api/auth/forgot-password", { email });
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#18181B] rounded-3xl shadow-2xl p-8 text-white">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center">
            <i className="ri-lock-password-line text-3xl text-violet-400"></i>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Enter your registered email address and we'll send you a password
          reset link.
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
          </div>

          <button
            type="submit"
            className="w-full h-14 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-violet-400 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

