import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { Outlet, useLocation, useNavigation } from 'react-router';
import Navbar from '../Components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FireBase/firebase.config';
import LoadingSpninner from '../Components/LoadingSpninner';

const MyLayouts = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
      switch (true) {
      case location.pathname === "/":
        document.title = "RentWheels | Home";
        break;
      case location.pathname === "/add-car":
        document.title = "RentWheels | Add Car";
        break;
      case location.pathname.startsWith("/browserCars"):
        document.title = "RentWheels | Browse Cars";
        break;
      case location.pathname === "/profile":
        document.title = "RentWheels | Profile";
        break;
      case location.pathname === "/login":
        document.title = "RentWheels | Login";
        break;
      case location.pathname === "/register":
        document.title = "RentWheels | Register";
        break;
      case location.pathname === "/my-listings":
        document.title = "RentWheels | My Listings";
        break;
      case location.pathname === "/bookings":
        document.title = "RentWheels | My Bookings";
        break;
      case location.pathname.startsWith("/cars"):
        document.title = "RentWheels | Car Details";
        break;
      case location.pathname.startsWith("/update"):
        document.title = "RentWheels | Car Update";
        break;
      default:
        document.title = "RentWheels | Not Found"; 
    }
  }, [location.pathname]);
  
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpninner />
    </div>
  );
}

    return (
        <div>
             <Navbar user={user} setUser={setUser} />
         {navigation?.state === 'loading' ? (
            <LoadingSpninner />
           ) :(
            <div className="pt-16"> 
         <Outlet context={{ user }} />
        <Footer></Footer>
          
            
      </div>
       )}
      
            
        </div>
    );
};

export default MyLayouts;