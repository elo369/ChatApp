import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { getProfileThunk } from './store/slice/user/user.thunk.js'
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Home from './pages/home/Home.jsx'
import Login from './pages/authentication/Login.jsx'
import Signup from './pages/authentication/Signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
       dispatch(getProfileThunk());
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
    </>
  )
}

export default App
