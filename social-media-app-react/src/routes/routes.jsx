import Login from "../pages/Login";
import Register from "../pages/Register";

import UserRoot from "../pages/user/UserRoot";
import UserDetails from "../pages/user/UserDetails";
import SearchUsers from "../pages/user/SearchUsers";

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
      },
      {
        path:'/user/search',
        element: <SearchUsers/>
      }
    ]
  }
  
];