import React, { createContext, useEffect, useReducer } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CHANGE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

type CartState = {
  cartItems: CartItem[];
};

const initialCartState: CartState = {
  cartItems: [],
};

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "CHANGE_QUANTITY":
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { cartItems: [] };

    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<
  | {
      cartItems: CartItem[];
      addToCart: (item: CartItem) => void;
      removeFromCart: (id: number) => void;
      changeQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initial) => {
      const local = localStorage.getItem("cart");
      return local ? { cartItems: JSON.parse(local) } : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const changeQuantity = (id: number, quantity: number) =>
    dispatch({ type: "CHANGE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


