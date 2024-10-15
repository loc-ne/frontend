import React, { useContext, useState, useEffect } from 'react';
import MyContextCart from './MyContextCart';
import MyContextUser from './MyContextUser';

const MyProviderCart = ({ children }) => {
    const [productsData, setProductsData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0.0);
    const [totalProduct, setTotalProduct] = useState(0);
    const { isLoggedIn, login, logout, userId, setUserId } = useContext(MyContextUser);

    const addToCart = (product) => {
        const existingProductIndex = productsData.findIndex(
            (item) => item.product_thumbnail === product.product_thumbnail && item.size === product.size
        );

        const updatedProductsData = [...productsData];

        if (existingProductIndex !== -1) {
            const existingProduct = updatedProductsData[existingProductIndex];
            existingProduct.product_quantity = parseInt(existingProduct.product_quantity, 10) + parseInt(product.product_quantity, 10);
        } else {
            updatedProductsData.push({
                ...product,
                product_quantity: parseInt(product.product_quantity, 10)
            });
        }

        setProductsData(updatedProductsData);
    };

    const removeProduct = (productToRemove) => {
        const updatedProducts = productsData.filter((product) => product !== productToRemove);
        setProductsData(updatedProducts);
        console.log(productsData);
    };

    const decreaseQuantity = (product) => {
        const updatedProducts = productsData.map((item) => {
            if (item === product && item.product_quantity > 1) {
                item.product_quantity--;
            }
            return item;
        });
        setProductsData(updatedProducts);
    };

    const increaseQuantity = (product) => {
        const updatedProducts = productsData.map((item) => {
            if (item === product && item.product_quantity < 10) {
                item.product_quantity++;
            }
            return item;
        });
        setProductsData(updatedProducts);
    };

    const calculateTotalAmount = () => {
        let sum = 0;
        productsData.forEach((item) => {
            sum += item.product_price * item.product_quantity;
        });
        setTotalAmount(sum);
    };


    const updateCartOnServer = async (cartData, userId) => {
        try {
            const response = await fetch('https://backend-m0xr.onrender.com/update_cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: cartData,
                    userId: userId
                })
            });

            const data = await response.json();
            if (response.ok) {
                if (data.message === 'Cart updated successfully') {
                    console.log('Cart updated successfully');
                    return;
                }
            } else {
                console.error('Server responded with an error:', data.message || 'Unknown error');
                throw new Error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart on server:', error);
        }
    };

    useEffect(() => {
        if (userId && isLoggedIn) {
            console.log(productsData);
            updateCartOnServer(productsData, userId);
        }
        console.log(productsData);
    }, [productsData]);

    const clearCart = () => {
        setProductsData([]);
    };

    return (
        <MyContextCart.Provider value={{ productsData, setProductsData, addToCart, removeProduct, decreaseQuantity, increaseQuantity, clearCart, calculateTotalAmount, totalAmount }}>
            {children}
        </MyContextCart.Provider>
    );
};

export default MyProviderCart;
