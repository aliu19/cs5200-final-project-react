import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Login from "./components/login/login";
import ErrorPage from "./components/error/error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage/>,
    children: [

    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
