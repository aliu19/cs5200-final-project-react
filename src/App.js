import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Login from "./components/login/login";
import ErrorPage from "./components/error/error"
import Register from "./components/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <ErrorPage/>,
  },
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
