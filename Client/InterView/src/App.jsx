import React,{ useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import { MainPage } from "./Pages/MainPage/Main.page";
import { Navbar } from "./Components/Navbar/Navbar.Component";
import { ExamsPage } from './Pages/Exams/Exams.Pages';
import { ExamPages } from "./Pages/Exam/Exam.Pages";
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
        {
          path: "Exams/:id",
          element: <ExamsPage></ExamsPage>
        },
        {
          path: "Exams/:id/Exam/:id",
          element: <ExamPages></ExamPages>
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
