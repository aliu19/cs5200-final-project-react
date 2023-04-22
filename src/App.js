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
import ExpenseList from "./components/expenses/expense-list";
import NewExpense from "./components/expenses/new-expense";
import currentUser from "./services/currentUser";

function App() {
  const { token, removeToken, setToken } = useToken();
  const { getUser, removeUser, setCurrentUser } = currentUser();

  // no token
  const router0 = createBrowserRouter([
    {
      path: "/",
      element: <Login  setToken={setToken} setCurrentUser={setCurrentUser}/>,
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
      element: <Profile currentUser={getUser()} token={token} setCurrentUser={setCurrentUser}/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/",
      element: <Trips currentUser={getUser()} token={token}/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/new-trip",
      element: <NewTrip currentUser={getUser()} token={token}/>,
      errorElement:  <ErrorPage/>
    },
    {
      path: "/trip/:tripId",
      element: <Trip currentUser={getUser()} token={token}/>,
      errorElement:  <ErrorPage/>
    },
    {
      path: "/trip/:tripId/expenses",
      element:<ExpenseList currentUser={getUser()} token={token}/>,
      errorElement:  <ErrorPage/>
    },
    {
      path: "/trip/:tripId/new-expense",
      element:<NewExpense token={token}/>,
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
                <Header token={removeToken} removeUser={removeUser}/>
                <RouterProvider router={router1}/>
              </div>
        }
      </div>
  );
}

export default App;
