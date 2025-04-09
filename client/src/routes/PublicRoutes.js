// import NotFound from "../components/NotFound";
import PublicLayout from "../layout/PublicLayout";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../components/user/Home";
import TaskManagment from "../pages/TaskManagment";

const publicRoutes = [
    {
        path : "/logIn",
        exact: true,
        element: <PublicLayout> <LogIn/> </PublicLayout>
    } ,
    {
        path : "/register",
        exact: true,
        element: <PublicLayout> <Register/> </PublicLayout>
    } ,
    {
      path : "/",
      exact: true,
      element: <PublicLayout> <HomePage/> </PublicLayout>
  } ,

   
]

export default publicRoutes;