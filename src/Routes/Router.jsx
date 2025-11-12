import { createBrowserRouter } from "react-router";
import MyLayouts from "../Layout/MyLayouts";
import Home from "../Pages/Home";
import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";
import LoadingSpninner from "../Components/LoadingSpninner";
import BrowseCars from "../Pages/BrowseCars";
import PrivateRoute from "../Components/PrivateRoute";
import ViewDetails from "../Pages/ViewDetails";




export const router = createBrowserRouter([
    {
        path:'/',
        element:<MyLayouts></MyLayouts>,
        hydrateFallbackElement:<LoadingSpninner></LoadingSpninner>,
        children:[
            {
                index: true,
                element:<Home></Home>,
                

            },
            {
                path:"/login",
                element: <LoginPage></LoginPage>
            }
            ,
            {
                path:"/register",
                element: <RegisterPage></RegisterPage>
            }
            ,
             {
                path: "/cars/:id",
                element: (
                <PrivateRoute>
                    <ViewDetails />
                </PrivateRoute>
                ),
            },
            {
                path: '/browserCars',
                element: <BrowseCars></BrowseCars>
            }
            
        ]
        
    }
    
])