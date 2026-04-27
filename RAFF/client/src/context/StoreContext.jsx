import { createContext, useContext, useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";

const StoreContext = createContext(null);

const CART_KEY = "raff_cart";
const WISHLIST_KEY = "raff_wishlist";
const USER_KEY = "raff_user";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(USER_KEY, null));

  const addToCart = (productId) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.productId === productId);
      const next =
        index >= 0
          ? prev.map((item, i) =>
              i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prev, { productId, quantity: 1 }];
      writeStorage(CART_KEY, next);
      return next;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      const next = prev
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0);
      writeStorage(CART_KEY, next);
      return next;
    });
  };

  const removeFromCart = (productId) => updateQuantity(productId, 0);

  const clearCart = () => {
    writeStorage(CART_KEY, []);
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      writeStorage(WISHLIST_KEY, next);
      return next;
    });
  };

  const login = (email) => {
    const user = { email };
    setCurrentUser(user);
    writeStorage(USER_KEY, user);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const cartItemsDetailed = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: PRODUCTS.find((p) => p.id === item.productId)
        }))
        .filter((item) => item.product),
    [cart]
  );

  const cartTotal = cartItemsDetailed.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value = {
    products: PRODUCTS,
    cart,
    wishlist,
    currentUser,
    cartItemsDetailed,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    login,
    logout
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
