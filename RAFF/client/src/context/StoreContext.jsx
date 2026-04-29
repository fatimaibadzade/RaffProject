import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { apiRequest } from "../lib/api";

const StoreContext = createContext(null);

const CART_KEY = "raff_cart";
const WISHLIST_KEY = "raff_wishlist";
const USER_KEY = "raff_user";
const TOKEN_KEY = "raff_token";

const SIZES_ORDER = ["xs", "s", "m", "l"];

function resolveClosestSize(requestedSize, availableSizes) {
  if (!Array.isArray(availableSizes) || availableSizes.length === 0) {
    return "m";
  }

  const normalized = Array.from(new Set(availableSizes));
  if (normalized.includes(requestedSize)) {
    return requestedSize;
  }

  const safeRequested = requestedSize && SIZES_ORDER.includes(requestedSize) ? requestedSize : "m";
  const requestedIndex = SIZES_ORDER.indexOf(safeRequested);
  let best = normalized[0];
  let bestScore = Number.POSITIVE_INFINITY;

  for (const size of normalized) {
    const idx = SIZES_ORDER.indexOf(size);
    const score = Math.abs(idx - requestedIndex);
    if (score < bestScore) {
      bestScore = score;
      best = size;
    } else if (score === bestScore) {
      // Tie-breaker: prefer the smaller size.
      if (idx < SIZES_ORDER.indexOf(best)) best = size;
    }
  }

  return best;
}

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
  const [cart, setCart] = useState(() => {
    const initial = readStorage(CART_KEY, []);
    return (Array.isArray(initial) ? initial : []).map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const availableSizes = product?.sizes?.length ? product.sizes : SIZES_ORDER;
      const mappedSize = resolveClosestSize(item.size ?? "m", availableSizes);
      return { ...item, size: mappedSize };
    });
  });
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(USER_KEY, null));
  const [token, setToken] = useState(() => readStorage(TOKEN_KEY, ""));
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (token) {
      writeStorage(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        return;
      }

      try {
        const payload = await apiRequest("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentUser(payload.user);
        writeStorage(USER_KEY, payload.user);
      } catch {
        setCurrentUser(null);
        setToken("");
        localStorage.removeItem(USER_KEY);
      }
    }

    restoreSession();
  }, [token]);

  const addToCart = (productId, requestedSize) => {
    setCart((prev) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      const availableSizes = product?.sizes?.length ? product.sizes : SIZES_ORDER;
      const mappedSize = resolveClosestSize(requestedSize ?? "m", availableSizes);

      const index = prev.findIndex(
        (item) => item.productId === productId && item.size === mappedSize
      );
      const next =
        index >= 0
          ? prev.map((item, i) =>
              i === index
                ? { ...item, quantity: item.quantity + 1, size: mappedSize }
                : item
            )
          : [...prev, { productId, quantity: 1, size: mappedSize }];
      writeStorage(CART_KEY, next);
      return next;
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    setCart((prev) => {
      const next = prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity, size }
            : item
        )
        .filter((item) => item.quantity > 0);
      writeStorage(CART_KEY, next);
      return next;
    });
  };

  const removeFromCart = (productId, size) => updateQuantity(productId, size, 0);

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

  const applyAuth = (payload) => {
    setCurrentUser(payload.user);
    setToken(payload.token);
    writeStorage(USER_KEY, payload.user);
  };

  const register = async ({ fullName, email, password }) => {
    setAuthLoading(true);
    try {
      const payload = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, password })
      });
      applyAuth(payload);
      return payload;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setAuthLoading(true);
    try {
      const payload = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      applyAuth(payload);
      return payload;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
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
    token,
    authLoading,
    cartItemsDetailed,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    register,
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
