import { useState, useEffect, useContext } from 'react';
import MyContextCart from './MyContextCart';
import MyContextUser from './MyContextUser';

const useCart = (userId) => {
    const { productsData, setProductsData, addToCart, clearCart } = useContext(MyContextCart);
    const { isLoggedIn } = useContext(MyContextUser);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch('https://backend-m0xr.onrender.com/get_cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.message === 'No cart data, created new cart') {
                        console.log("Create new cart");
                        return;
                    }
                    const updateCart = [];
                    data.map((item) => {
                        const product = {
                            product_id: item.product.id,
                            product_name: item.product.name,
                            product_thumbnail: item.product.thumbnail,
                            product_price: item.product.price,
                            product_quantity: item.quantity,
                            size: item.size
                        };
                        updateCart.push(product);
                    });
                    setProductsData(updateCart);



                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userId && isLoggedIn) {
            fetchCartData();
        }
    }, [userId, isLoggedIn]);
};

export default useCart;
