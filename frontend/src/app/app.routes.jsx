import {createBrowserRouter} from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import VerifyEmail from "../features/auth/pages/VerifyEmail"
import ForgotPassword from "../features/auth/pages/ForgotPassword"

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/verify-email",
        element:<VerifyEmail/>
    },
    {
        path:"/forgot-password",
        element:<ForgotPassword/>
    }
])