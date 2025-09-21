
import AuthLayout from "@/layout/authLayout/AuthLayout";
import MainLayout from "@/layout/mainLayout/MainLayout";
import NotFound from "@/pages/NotFound";
import React, { Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const Login = React.lazy(() => import("@/pages/Login"))
const AuthSuccess = React.lazy(() => import("@/pages/AuthSucess"))
const Dashboard = React.lazy(() => import("@/pages/Dashboard"))
const Users = React.lazy(() => import("@/pages/Users"))

const router: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      }
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense>
              <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth-success",
    element: (
      <Suspense>
        <AuthSuccess />
      </Suspense>
    ),
  },
];

export const Router = () => {
  return useRoutes(router);
};