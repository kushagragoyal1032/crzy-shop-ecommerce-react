import { useEffect } from "react";
import { useState, useContext, createContext } from "react";

const CartContext = createContext()

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        let localStorageCartItems = localStorage.getItem('cart');
        if(localStorageCartItems) {
            setCart(JSON.parse(localStorageCartItems));
        }
    },[])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext); // create useCart function

export { CartProvider, useCart };

//now wrap into index.js and create input form in components folder