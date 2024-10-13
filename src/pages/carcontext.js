import React,{createContext,useState} from "react";
export const CartContext=createContext();
export const CartProvider=({children})=>{
    const[cartItems,setCartItems]=useState([]);
    const addToCart=(product)=>{
        setCartItems(prevItems=>{
            const itemInCart=prevItems.find(item=>item.id===product.id);
            if(itemInCart){
                return prevItems.map(item=>
                    item.id===product.id?{...item,quantity:item.quantity+1}:item
                );
            }
            return [...prevItems,{...product,quantity:1}];
        });
    };
    const incrementQuant=(productId)=>{
        setCartItems(prevItems=>
            prevItems.map(item=>
                item.id===productId?{...item,quantity:item.quantity+1}:item
            )
        );
    };
    const decrementQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };
    return(
        <CartContext.Provider value={{cartItems,clearCart,addToCart,incrementQuant,decrementQuantity}}>
            {children}
        </CartContext.Provider>
    )
}