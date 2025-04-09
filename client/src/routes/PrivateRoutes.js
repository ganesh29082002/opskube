
import PrivetLayout from "../layout/PrivetLayout";
import AllEvents from "../pages/AllEvents";
import Dashboard from "../pages/Dashboard";
import RegisterEvent from "../pages/RegisterEvent";
import TaskManagment from "../pages/TaskManagment";

const PrivetRoutes = [
    {
        path : "/dashboard",
        exact: true,
        element: <PrivetLayout> <Dashboard/> </PrivetLayout>
    } ,

    {
        path : "/event-managment",
        exact: true,
        element: <PrivetLayout> <TaskManagment/> </PrivetLayout>
    } ,

    {
        path : "/all-events",
        exact: true,
        element: <PrivetLayout> <AllEvents/> </PrivetLayout>
    } 
    ,
    {
        path : "/register-event",
        exact: true,
        element: <PrivetLayout> <RegisterEvent/> </PrivetLayout>
        
    }

  
  
]

export default PrivetRoutes;