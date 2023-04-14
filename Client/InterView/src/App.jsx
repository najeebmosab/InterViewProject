import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import { MainPage } from "./Pages/MainPage/Main.page";
import { Navbar } from "./Components/Navbar/Navbar.Component";
import { ExamsPage } from './Pages/Exams/Exams.Pages';
import { ExamPages } from "./Pages/Exam/Exam.Pages";
import { CompanyAuthForm } from './Pages/AuthCompany/AuthCompany.pages';
import { ExamTable } from './Pages/TableExams/TabelExams.Pages';
import { CompanyMain } from './Pages/CompanyMainPage/CompanyMain.Pages';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage></AuthPage>
    },
    {
      path: "/company/login",
      element: <CompanyAuthForm></CompanyAuthForm>
    },
    {
      path: "CompanyMainPage",
      element: <CompanyMain></CompanyMain>,
      children: [
        {
          path: "",
          element: <ExamTable />
        }
      ]
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
