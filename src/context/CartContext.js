import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Carrinho local (em memória, não persistido). Assets são digitais: no máximo uma unidade de cada.
// Guarda uma cópia mínima do asset; a compra em si depende do contrato da API.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((asset) => {
    setItems((prev) =>
      prev.some((item) => item.id === asset.id)
        ? prev
        : [...prev, { id: asset.id, title: asset.title, price: asset.price }]
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => {
    // Soma em centavos para evitar erros de ponto flutuante.
    const totalCents = items.reduce((sum, item) => sum + Math.round(item.price * 100), 0);
    return {
      items,
      count: items.length,
      total: totalCents / 100,
      isInCart: (id) => items.some((item) => item.id === id),
      addItem,
      removeItem,
    };
  }, [items, addItem, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider.');
  }
  return context;
}
