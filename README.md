# 🚗 RentWheels – Car Rental Platform (Client Side)

🔗 **Live Site:** https://rent-wheels-auth-4c421.web.app/  
  

---

## 📌 About the Project
**RentWheels** is a full-stack MERN car rental platform where users can browse available cars, view details, and book cars for specific dates.  
Car owners or rental providers can list their vehicles, manage bookings, and update availability easily through a secure dashboard.

This project focuses on real-world features such as authentication, protected routes, CRUD operations, and booking management with availability control.

---

## 🚀 Main Features
- 🔐 User Authentication (Email/Password & Google Login)
- 🚘 Add, Update, and Delete Cars (Provider Only)
- 📅 Car Booking System with Availability Status
- 🛑 Prevents Double Booking
- 🔍 Search Cars by Name
- 🏷️ Available / Booked Badge on Car Cards
- 🔒 Private Routes with Persistent Login on Reload
- 🎨 Modern UI with Animations (Framer Motion / Lottie)
- 🔔 Toast / SweetAlert Notifications (No Browser Alerts)
- 📱 Fully Responsive Design (Mobile, Tablet & Desktop)

---

## 🧭 Website Pages & Routes

### 🌐 Public Routes
- Home  
- Browse Cars  
- Login  
- Register  

### 🔒 Private Routes
- Add Car  
- My Listings  
- My Bookings  
- Car Details  

> Logged-in users are not redirected to the login page on reload.

---

## 🏠 Home Page Sections
- Hero Banner / Slider
- Featured Cars (Latest 6 cars from database)
- Why Rent With Us
- Top Rated Cars
- Customer Testimonials

---

## 🔐 Authentication Details
- Firebase Authentication
- Password Requirements:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
- All success and error messages are shown using Toast or SweetAlert
- No Lorem Ipsum text used

---

## 🛠️ Car Management (CRUD)

### ➕ Add Car
- Car Name
- Description
- Category (Sedan, SUV, Hatchback, Luxury, Electric)
- Rent Price (Per Day)
- Location
- Image URL
- Provider Name (Read Only)
- Provider Email (Read Only)

### ✏️ Update Car
- Pre-filled form with existing data
- Provider information is not editable

### 🗑️ Delete Car
- Confirmation popup before delete
- Instantly updates UI after deletion

---

## 📅 Booking System
- Only logged-in users can book cars
- Booking updates car availability in database
- Prevents multiple users from booking the same car
- Booking confirmation shown with animation

---

## ❌ 404 Page
- Custom 404 error page
- Back to Home button
- Navbar and Footer are hidden on this page

---

## ⏳ Loading State
- A loading spinner is displayed during data fetching

---

## 🎨 UI & UX Highlights
- Clean and professional car rental theme
- Consistent typography and spacing
- Equal height and width car cards
- Responsive grid layout
- Smooth animations and transitions

---

## 🧪 Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- Firebase Authentication
- Axios
- SweetAlert2 / React Hot Toast
- Framer Motion
- Lottie React

---

## ☁️ Hosting
- Client Side hosted on **Netlify / Firebase**
- Firebase authorized domain added for authentication

---

## 📦 GitHub Commit History
- Minimum **15 meaningful commits** on the client side

---

## 👤 Author
**Md Shariyar Kobir**  
Frontend / MERN Stack Developer  

---

## ⭐ Final Note
RentWheels is a complete, real-world car rental platform designed with scalability, security, and user experience in mind.  
This project is suitable for portfolio showcase and job applications.
