import Login from "../pages/Login";
import Register from "../pages/Register";
import SessionChecker from "../pages/SessionChecker";

import UserRoot from "../pages/user/UserRoot";
import UserDetails from "../pages/user/UserDetails";

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
  },
  {
    path:'/user',
    element:<UserRoot/>,
    children:[
      {
        index:true,
        element:<UserDetails/>
      }
    ]
  }
];