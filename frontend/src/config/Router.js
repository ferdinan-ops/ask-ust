import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../components";
import { Home } from "../pages";

const Router = () => {
   const router = createBrowserRouter([
      {
         path: "/",
         element: <Layout />,
         children: [
            {
               path: "/forum",
               element: <Home />,
            },
         ],
      },
   ]);

   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
};

export default Router;
