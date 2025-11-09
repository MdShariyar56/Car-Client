import { BsTwitterX } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import {  FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-base-100  border-gray-200 mt-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col   items-start gap-3">
          <img
            src="https://i.ibb.co/Ww8WRmp/Gemini-Generated-Image-ycpm1xycpm1xycpm-removebg-preview.png"
            alt="RentWheels Logo"
            className="w-56 h-auto rounded"
          />
          <p className="text-gray-600 text-sm md:text-base max-w-xs">
            Find and rent cars from verified owners in your city.  
            Easy booking, secure payments, and 24/7 support with RentWheels!
        </p>

        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg text-black">Quick Links</h3>
          <Link to="/" className="text-gray-600 hover:text-blue-500 hover:font-semibold hover:underline transition">Home</Link>
          <Link to="/add-car" className="text-gray-600 hover:text-blue-500 hover:font-semibold hover:underline transition">Add Car</Link>
          <Link to="/my-listings" className="text-gray-600 hover:text-blue-500 hover:font-semibold hover:underline transition">My Listings</Link>
          <Link to="/my-bookings" className="text-gray-600 hover:text-blue-500 hover:font-semibold hover:underline transition">My Bookings</Link>
          <Link to="/browse" className="text-gray-600 hover:text-blue-500 hover:font-semibold hover:underline transition">Browse Cars</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg text-black">Contact Us</h3>
          <p className="text-gray-600 text-sm md:text-base">Email: shariyarkobir2005@gmail.com</p>
          <p className="text-gray-600 text-sm md:text-base">Phone: +880 1764841333</p>
           <p className="text-gray-600 text-sm md:text-base">Head Office: Mirpur-10,Dhaka,Bangladesh</p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://www.facebook.com/md.shariyar.kobir.2024" className="text-gray-600 hover:text-blue-600"><CiFacebook size={30} /></a>
            <a href="#" className="text-gray-600 hover:text-black"><BsTwitterX size={20} /></a>
            <a href="https://www.instagram.com/shariyar__kobir/?hl=en" className="text-gray-600 hover:text-pink-500"><FaInstagram size={25} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600"><FaLinkedinIn size={25} /></a>
          </div>
         
        </div>

      </div>
      <div className="footer sm:footer-horizontal footer-center  text-gray-500 p-4">
  <aside>
     <p>Copyright © {new Date().getFullYear()} RentWheels. All rights reserved.</p>

  </aside>
</div>
    </footer>
    
  );
};

export default Footer;
