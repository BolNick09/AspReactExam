
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import DeadEnd from './Pages/DeadEnd'
import Home from './Pages/Home'
import NavBar from './Pages/NavBar'
import ResultsTable from './blindMaching/pages/ResultsTable'
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";

import Game from './blindMaching/components/Game';


function NavbarWrapper() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/game",
        element: <Game />
      },
      {
        path: "/results",
        element: <ResultsTable />
      },
      {
        path: "*",
        element: <DeadEnd />
      },
      { path: "/login", 
        element: <LoginPage /> 
      },
      { path: "/register", 
        element: <RegisterPage /> 
      },
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;