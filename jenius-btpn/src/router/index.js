import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../components/Home";
import AddForm from "../components/AddForm";
import Edit from "../components/Edit";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddForm />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

export default router;
