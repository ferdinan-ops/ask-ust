import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";

import { Layout } from "../components";
import { Home, Login, Register, Create, Tags, Users, Profile, Notification, Detail, LandingPage } from "../pages";

const Router = ({ currentUser }) => {
   const ProtectedRoute = ({ children }) => {
      if (!currentUser) return <Navigate to="/login" />;
      return children;
   };

   const ProtectedAuth = ({ children }) => {
      if (currentUser) return <Navigate to="/forum/questions" />;
      return children;
   }

   const AutoNavigate = () => {
      return <Navigate to="/forum/questions" />
   }

   const router = createBrowserRouter([
      {
         path: "/",
         element: <LandingPage />
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
               element: <AutoNavigate />
            },
            {
               path: "/forum/questions",
               element: <Home />,
            },
            {
               path: "/forum/questions/:id",
               element: <Detail />,
            },
            {
               path: "/forum/tags",
               element: <Tags />,
            },
            {
               path: "/forum/users",
               element: <Users />,
            },
            {
               path: "/forum/users/:id",
               element: <Profile />,
            },
         ],
      },
      {
         path: "/forum",
         element: (
            <ProtectedRoute>
               <Layout isLeftBar />
            </ProtectedRoute>
         ),
         children: [
            {
               path: "/forum/notification",
               element: <Notification />,
            },
            {
               path: "/forum/create",
               element: <Create />,
            },
         ]
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
