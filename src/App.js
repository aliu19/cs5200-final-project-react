import {BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./components/login/login";
import ErrorPage from "./components/error/error"
import Register from "./components/register/register";
import useToken from "./services/useToken";
import Header from "./components/header/header";
import Profile from "./components/profile/profile";
import Trips from "./components/trips/trips";
import {useEffect, useState} from "react";
import {profile} from "./services/services";
import NewTrip from "./components/trip/new-trip";
import Trip from "./components/trip/trip";

function App() {
  const { token, removeToken, setToken } = useToken();

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    profile(token).then((data) => {
      data.access_token && setToken(data.access_token)
      setCurrentUser({
        username: data.username,
        password :data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      })
    })
  }, [token])

  // no token
  const router0 = createBrowserRouter([
    {
      path: "/",
      element: <Login  setToken={setToken}/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/register",
      element: <Register/>,
      errorElement: <ErrorPage/>,
    },
  ]);

  // with token
  const router1 = createBrowserRouter([
    {
      path: "/profile",
      element: <Profile currentUser={currentUser} token={token}/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/",
      element: <Trips currentUser={currentUser} token={token}/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/new-trip",
      element: <NewTrip currentUser={currentUser} token={token}/>,
      errorElement:  <ErrorPage/>
    },
    {
      path: "/trip/:tripId",
      element: <Trip token={token}/>,
      errorElement:  <ErrorPage/>
    }
  ]);

  return (
      <div>
        {
          !token && token!=="" || token === undefined ?
              <RouterProvider router={router0}/>
              :
              <div className="container-fluid">
                <Header token={removeToken}/>
                <RouterProvider router={router1}/>
              </div>
        }
      </div>
  );
}

export default App;
