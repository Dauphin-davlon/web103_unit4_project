import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewLaptops from "./pages/ViewLaptops";
import EditLaptop from "./pages/EditLaptop";
import CreateLaptop from "./pages/CreateLaptop";
import CarDetails from "./pages/CarDetails";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateLaptop title="BOLT BUCKET | Customize" />,
    },
    {
      path: "/customlaptops",
      element: <ViewLaptops title="" />,
    },
    {
      path: "/customcars/:id",
      element: <CarDetails title="BOLT BUCKET | View" />,
    },
    {
      path: "/edit/:id",
      element: <EditLaptop title="BOLT BUCKET | Edit" />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />

      {element}
    </div>
  );
};

export default App;
