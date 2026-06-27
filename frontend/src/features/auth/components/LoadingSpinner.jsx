const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-violet-900/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400 animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-white text-lg font-semibold">Loading...</h2>
          <p className="text-gray-400 text-sm mt-1">
            Please wait while we prepare your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
