# RentWheels – Car Rental Platform

**Live Site:** https://your-live-site-url.com  

RentWheels is a full-stack MERN application that connects local car providers with users. Users can browse available cars, view detailed information, and book rentals for specific dates. Providers can list vehicles, update their details, and manage bookings efficiently.  

---

## Main Features

- **Dynamic Car Browsing:** Users can browse cars from all providers and search by name or category.  
- **Authentication:** Supports Email/Password and Google login. Private routes are protected.  
- **CRUD for Providers:** Providers can add, update, and delete cars.  
- **Booking System:** When a car is booked, its availability is automatically updated and a confirmation toast is shown.  
- **Responsive & Modern UI:** Clean and fully responsive design built with Tailwind CSS.  
- **Extra Sections:** Home page includes Hero carousel, Featured Cars, Why Rent With Us (4 cards), Top Rated Cars, and Customer Testimonials.  
- **User Experience Enhancements:** Success/Error messages are displayed using SweetAlert or React-Toastify. Loading spinners, hover effects, and animations included.  

---

## Tech Stack

- Frontend: React, React Router, TailwindCSS  
- Authentication: Firebase Auth (Email/Password + Google)  
- API Requests: Axios / Fetch to Node.js/Express server  
- UI Enhancements: Lottie React, Framer Motion, sweetalert2  

---

## Installation (Local Development)

```bash
# Clone the repository
git clone https://github.com/MdShariyar56/Car-Client.git
cd Car-Client

# Install dependencies
npm install


# Start the development server
npm run dev
