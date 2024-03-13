import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // https://reactrouter.com/en/main/routers/create-browser-router
import { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/
import GlobalComponents from "./components/GlobalComponents";

import Home from "./components/pages/Home";
import BuyATicket from "./components/pages/BuyATicket";
import PageNotFound from "./components/pages/PageNotFound";

const App = () => {
  const router = createBrowserRouter([
    { path: "*", element: <PageNotFound /> },
    {
      path: "/",
      element: <GlobalComponents />,
      children: [
        { path: "", element: <Home /> },
        { path: "tickets", element: <BuyATicket /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
