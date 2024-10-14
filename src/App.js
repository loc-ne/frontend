import React from 'react';
import './index.css';
import './assets/css/Navbar.css';
import './assets/css/StoreNavigation.css';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kid from './pages/Kid';
import Sport from './pages/Sport';
import Shoes from './pages/Shoes';
import Products from './pages/Products';
import MyProviderCart from './MyProviderCart';
import MyProviderUser from './MyProviderUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';

import Layout from './Layout';
import OrderSumary from './pages/OrderSummary';
import ThankYouPage from './pages/ThankYou';
import Search from './pages/Search';
import OrdersOverview from './pages/OrdersOverview';
import MyProviderOrder from './MyProviderOrder';
import OrderDetail from './pages/OrderDetail';

function App() {
    return (
        <MyProviderUser>
            <MyProviderCart>
                <MyProviderOrder>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="/men" element={<Men />} />
                                <Route path="/women" element={<Women />} />
                                <Route path="/kid" element={<Kid />} />
                                <Route path="/sport" element={<Sport />} />
                                <Route path="/shoes/:gender/:request" element={<Shoes />} />
                                <Route path="/product/:id/:name" element={<Products />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/account" element={<Account />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/order_sumary" element={<OrderSumary />} />
                                <Route path="/order_complete" element={<ThankYouPage />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/order_overview" element={<OrdersOverview />} />
                                <Route path="/order_detail" element={<OrderDetail />} />
                            </Route>
                        </Routes>
                    </Router>
                </MyProviderOrder>
            </MyProviderCart>
        </MyProviderUser>
    );
}


export default App;
