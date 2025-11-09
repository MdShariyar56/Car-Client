import React from 'react';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const MyLayouts = () => {
    return (
        <div>
           <Navbar></Navbar>
            <div className="pt-16"> 
        <Outlet />
        <Footer></Footer>
      </div>
      
            
        </div>
    );
};

export default MyLayouts;