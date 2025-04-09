

import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./PrivateRoutes";
import publicRoutes from './PublicRoutes'
const routers = createBrowserRouter([
    ...privateRoutes,
    ...publicRoutes
])

export default routers;