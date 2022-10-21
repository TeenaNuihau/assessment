import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { rootLoader } from "./routes/root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
          { },
        ],
      },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);