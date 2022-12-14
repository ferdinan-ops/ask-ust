import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";

import { Layout } from "../components";
import { Home, Login, Register } from "../pages";

const Router = ({ currentUser }) => {
   const ProtectedRoute = ({ children }) => {
      if (!currentUser) return <Navigate to="/login" />;
      return children;
   };

   const ProtectedAuth = ({ children }) => {
      if (currentUser) return <Navigate to="/forum" />;
      return children;
   }

   const AutoNavigate = () => {
      return <Navigate to="/forum" />
   }

   const router = createBrowserRouter([
      {
         path: "/",
         element: <AutoNavigate />
      },
      {
         path: "/forum",
         element: (
            <ProtectedRoute>
               <Layout />
            </ProtectedRoute>
         ),
         children: [
            {
               path: "/forum",
               element: <Home />,
            },
         ],
      },
      {
         path: "/login",
         element: (
            <ProtectedAuth>
               <Login />
            </ProtectedAuth>
         ),
      },
      {
         path: "/register",
         element: (
            <ProtectedAuth>
               <Register />
            </ProtectedAuth>
         ),
      },
   ]);

   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
};

export default Router;
