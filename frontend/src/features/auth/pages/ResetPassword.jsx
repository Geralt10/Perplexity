
import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { handleResetPassword } = useAuth();
  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    return;
  }

  const success = await handleResetPassword(
    token,
    formData.password
  );

  if (success) {
    navigate("/login");
  }
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
          Reset Password
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Enter your new password below to secure your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="block text-sm mb-2">
              New Password
            </label>

            <div className="flex items-center bg-[#1F1F23] border border-gray-700 rounded-xl px-4 h-14">
              <i className="ri-lock-line text-gray-400"></i>

              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Confirm Password
            </label>

            <div className="flex items-center bg-[#1F1F23] border border-gray-700 rounded-xl px-4 h-14">
              <i className="ri-lock-line text-gray-400"></i>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Remembered your password?{" "}
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

export default ResetPassword;

