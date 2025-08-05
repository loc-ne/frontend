## Introduction
This project is created by a student who is starting to learn and practice web development. Kangyoo Shoes is a simple e-commerce web application for shoe shopping, built with React, Tailwind CSS, and Firebase. The project helps me understand the basics of building a real-world web app, including:
- How to structure a React project
- How to manage state and user authentication
- How to connect frontend with backend APIs
- How to use Firebase for image storage
- How to implement shopping cart, checkout, and payment features

All code and features are designed for learning and practicing web development skills.

## Features
- Browse shoes by category: Men, Women, Kid, Sport
- Product search with image thumbnails
- User registration and login
- Shopping cart and quantity management
- Checkout with address selection (city, district, street)
- Order placement and payment (VNPay integration)
- Order history and order details
- Responsive UI with Tailwind CSS
- Firebase for image storage

## Getting Started

### Prerequisites
- Node.js >= 14
- npm

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/loc-ne/frontend.git
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
   The app will run at `http://localhost:3000`.

### Firebase Setup
- The project uses Firebase for image storage. The configuration is in `src/firebase.js`.
- You can use the provided config or replace with your own Firebase project.

### Backend API
- The app connects to a backend API (see `fetch` calls in source code) for product, user, and order management.
- Example endpoints:
  - `https://backend-m0xr.onrender.com/search`
  - `https://backend-m0xr.onrender.com/order`
  - `https://backend-m0xr.onrender.com/payment`

## Main Pages & Components
- `Home`, `Men`, `Women`, `Kid`, `Sport`: Category pages
- `Products`: Product detail
- `Cart`: Shopping cart
- `Account`: Login/Register/Dashboard
- `Checkout`: Address and payment
- `OrderSummary`, `ThankYou`, `OrdersOverview`, `OrderDetail`: Order management
- `Search`: Product search
- Shared: `NavbarMenu`, `Footer`, `PromoSection`, `LoadingSpinner`, etc.

## Customization
- Update Firebase config in `src/firebase.js` for your own storage
- Change backend API endpoints in source code if needed
- Style with Tailwind CSS in `src/assets/css/`

## Learning Purpose
### Learning Purpose
This project is for:
- Practicing React fundamentals and component-based architecture
- Learning state management with Context API and hooks
- Integrating Firebase for cloud storage
- Building RESTful API connections with a backend server
- Implementing authentication, cart, and order flows in a real-world e-commerce scenario
- Applying Tailwind CSS for responsive UI design
- Understanding payment integration and order tracking
- Deploy production
<!-- Upload tại giphy.com -->
![Demo](docs/demos/payment-demo.gif)
