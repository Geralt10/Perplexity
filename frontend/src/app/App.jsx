import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../features/auth/hooks/useAuth";

const App = () => {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
