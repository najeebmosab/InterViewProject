import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import { MainPage } from "./Pages/MainPage/Main.page";
import { Navbar } from "./Components/Navbar/Navbar.Component";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage></AuthPage>
    },
    {
      path: "/MainPage",
      element: <Navbar></Navbar>,
      children: [
        {
          path: "",
          element: <MainPage></MainPage>
        },
      ]

    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
