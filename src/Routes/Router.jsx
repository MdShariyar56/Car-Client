import { createBrowserRouter } from "react-router";
import MyLayouts from "../Layout/MyLayouts";
import Home from "../Pages/Home";
import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";
import LoadingSpninner from "../Components/LoadingSpninner";
import BrowseCars from "../Pages/BrowseCars";
import PrivateRoute from "../Components/PrivateRoute";
import ViewDetails from "../Pages/ViewDetails";
import AddCar from "../Pages/AddCar";
import MyListings from "../Pages/MyListings";
import UpdateCar from "../Pages/UpdateCar";
import MyBookings from "../Pages/MyBookings";
import ProfilePage from "../Pages/ProfilePage";
import NotFound from "../Components/NotFound";






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
            },
            {
                path:'/profile',
                element:<ProfilePage></ProfilePage>
            },
             {
                path: "/cars/:id",
                element: (
                <PrivateRoute>
                    <ViewDetails />
                </PrivateRoute>
                ),
            },
            {
            path: "/add-car",
            element: (
                <PrivateRoute>
                <AddCar />
                </PrivateRoute>
            ),
            },
            {
                path: '/browserCars',
                element: <BrowseCars></BrowseCars>
            },
            {
                path:'/my-listings',
                element:(
                <PrivateRoute>
                    <MyListings />
                </PrivateRoute>
                ),
            },
            {
                path: "/update/:id",
                element: (
                    <PrivateRoute>
                    <UpdateCar />
                    </PrivateRoute>
            ),
            },
            {
                path: "/bookings",
                element: (
                    <PrivateRoute>
                    <MyBookings></MyBookings>
                    </PrivateRoute>
            ),
            }
            
        ]
            
    },
    {
                path: '/*',
                element: <NotFound></NotFound>
            }
    
])