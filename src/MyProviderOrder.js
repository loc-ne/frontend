import React, { useContext, useState, useEffect } from 'react';
import MyContextCart from './MyContextCart';
import MyContextUser from './MyContextUser';
import MyContextOrder from './MyContextOrder';

const MyProviderOrder = ({ children }) => {
    const [ordersData, setOrdersData] = useState([]);

    const removeOrder = async (order_id, orderToRemove) => {
        const updatedProducts = ordersData.filter((order) => order !== orderToRemove);
        setOrdersData(updatedProducts);

        try {
            const response = await fetch(`http://localhost:5000/remove_order?order_id=${order_id}`)

            const data = await response.json();

            if (response.ok) {
                if (data.message === 'Order removed successfully') {
                    return;
                }
            } else {
                console.error('Server responded with an error:', data.message || 'Unknown error');
                throw new Error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating order on server:', error);
        }
    };


    return (
        <MyContextOrder.Provider value={{ ordersData, removeOrder, setOrdersData }}>
            {children}
        </MyContextOrder.Provider>
    );
};

export default MyProviderOrder;