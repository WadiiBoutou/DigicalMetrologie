"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

const CART_KEY = "digical-cart";

export function useDigicalCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart items", error);
        }
      }
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const setCartLineQuantity = useCallback((product: Product, quantity: number) => {
    setCartItems((prev) => {
      const q = Math.round(quantity);
      if (q <= 0) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      const clamped = Math.min(99, Math.max(1, q));
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx === -1) {
        return [...prev, { product, quantity: clamped }];
      }
      const next = [...prev];
      next[idx] = { ...next[idx]!, quantity: clamped };
      return next;
    });
  }, []);

  const toggleCartItem = useCallback((product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return useMemo(
    () => ({
      cartItems,
      cartCount,
      setCartLineQuantity,
      toggleCartItem,
      clearCart,
      isLoaded,
    }),
    [cartItems, isLoaded, cartCount, setCartLineQuantity, toggleCartItem, clearCart]
  );
}

