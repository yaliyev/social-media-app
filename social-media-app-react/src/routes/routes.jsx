import Login from "../pages/Login";
import Register from "../pages/Register";
import SessionChecker from "../pages/SessionChecker";



export const ROUTES =[
  {
    path:'/',
    element:<Login/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
];