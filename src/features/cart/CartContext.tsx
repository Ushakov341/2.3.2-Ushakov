import { createContext, useContext, useMemo, useReducer } from 'react';
import type { CartAction, CartItem, CartState } from './types';

const initial: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, qty: i.qty + action.qty }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, qty: action.qty }],
      };
    }
    case 'SET_QTY': {
      const items = state.items
        .map((i) =>
          i.product.id === action.productId ? { ...i, qty: action.qty } : i
        )
        .filter((i) => i.qty > 0);
      return { items };
    }
    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case 'CLEAR':
      return initial;
    default:
      return state;
  }
}

type Ctx = {
  state: CartState;
  add(product: any, qty?: number): void;
  setQty(productId: number, qty: number): void;
  remove(productId: number): void;
  clear(): void;
  totalCount: number;
  totalPrice: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const value = useMemo<Ctx>(() => {
    const totalCount = state.items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = state.items.reduce(
      (s, i) => s + i.qty * i.product.price,
      0
    );
    return {
      state,
      add: (p, q = 1) => dispatch({ type: 'ADD', product: p, qty: q }),
      setQty: (id, q) => dispatch({ type: 'SET_QTY', productId: id, qty: q }),
      remove: (id) => dispatch({ type: 'REMOVE', productId: id }),
      clear: () => dispatch({ type: 'CLEAR' }),
      totalCount,
      totalPrice,
    };
  }, [state]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
