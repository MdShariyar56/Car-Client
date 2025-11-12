import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FireBase/firebase.config';
import LoadingSpninner from '../Components/LoadingSpninner';

const MyLayouts = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  
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
            <div className="pt-16"> 
         <Outlet context={{ user }} />
        <Footer></Footer>
      </div>
      
            
        </div>
    );
};

export default MyLayouts;