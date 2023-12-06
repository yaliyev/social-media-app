import Login from "./pages/Login"
import "./assets/style/background.css"
import { Row } from "antd"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ROUTES } from "./routes/routes"

const routes = createBrowserRouter(ROUTES);


function App() {


  return (
    <>
      <Row>

        <RouterProvider router={routes}></RouterProvider>

      </Row>


    </>
  )
}

export default App
