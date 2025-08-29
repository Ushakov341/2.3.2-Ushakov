import { Product } from '../../types/product';

export type CartItem = {
  product: Product;
  qty: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: 'ADD'; product: Product; qty: number }
  | { type: 'SET_QTY'; productId: number; qty: number }
  | { type: 'REMOVE'; productId: number }
  | { type: 'CLEAR' };
