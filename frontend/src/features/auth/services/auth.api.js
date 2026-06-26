import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;

      try {
        // Refresh access token
        await api.post("/refresh-token");

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token bhi invalid hai
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



export  async function register({username,email,password}) {
    const response = await api.post("/register",{
        username,
        email,
        password
    })
    return response.data
}

export async function login({email,password}) {
    const response = await api.post("/login",{
        email,
        password
    });

    return response.data
}

export async function getMe() {
    const response = await api.get("/get-me");
    return response.data
}

export async function resendVerificationEmail({email}) {
    const response = await api.post("/resend-verification-email",{email});
    return response.data
}

export async function forgotPassword({email}){
    const response = await api.post("/forgot-password",{email});
    return response.data
}

export async function resetPassword({token,password}) {
    const response = await api.post(`/reset-password?token=${token}`,{password});
    return response.data
}


export async function logout() {
  const response = await api.post("/logout");
  return response.data;
}

