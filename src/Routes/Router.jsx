import { createBrowserRouter } from "react-router";
import MyLayouts from "../Layout/MyLayouts";
import Home from "../Pages/Home";
import LoadingSpninner from "../Components/LoadingSpninner";



export const router = createBrowserRouter([
    {
        Path:'/',
        element:<MyLayouts></MyLayouts>,
        hydrateFallbackElement:<LoadingSpninner></LoadingSpninner>,
        children:[
            {
                index: true,
                element:<Home></Home>

            }
        ]
        
    }
])