'use client';

/**
 * Cart state: Context + useReducer, persisted to localStorage.
 * Only slugs and quantities are stored — names, images and prices are always
 * re-read from products.ts (via the catalog prop), so a price change is
 * reflected in existing carts.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import type { Availability } from '@/data/types';
import { track } from './analytics';

/** The slim product shape the browser needs. Built on the server from products.ts. */
export interface CartCatalogItem {
  slug: string;
  name: string;
  /** Effective (sale-aware) unit price. */
  price: number;
  availability: Availability;
  image?: { src: string; focus?: string };
}

const STORAGE_KEY = 'valora-cart-v1';
const MAX_QTY = 99;

interface CartItem {
  slug: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
}

type Action =
  | { type: 'hydrate'; items: CartItem[] }
  | { type: 'add'; slug: string; quantity: number }
  | { type: 'setQty'; slug: string; quantity: number }
  | { type: 'remove'; slug: string }
  | { type: 'clear' }
  | { type: 'open' }
  | { type: 'close' };

const clamp = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(n)));

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, items: action.items, hydrated: true };
    case 'add': {
      const existing = state.items.find((i) => i.slug === action.slug);
      const items = existing
        ? state.items.map((i) => (i.slug === action.slug ? { ...i, quantity: clamp(i.quantity + action.quantity) } : i))
        : [...state.items, { slug: action.slug, quantity: clamp(action.quantity) }];
      return { ...state, items, isOpen: true };
    }
    case 'setQty': {
      const q = clamp(action.quantity);
      return {
        ...state,
        items: q === 0 ? state.items.filter((i) => i.slug !== action.slug) : state.items.map((i) => (i.slug === action.slug ? { ...i, quantity: q } : i)),
      };
    }
    case 'remove':
      return { ...state, items: state.items.filter((i) => i.slug !== action.slug) };
    case 'clear':
      return { ...state, items: [] };
    case 'open':
      return { ...state, isOpen: true };
    case 'close':
      return { ...state, isOpen: false };
  }
}

export interface CartLine {
  product: CartCatalogItem;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i): i is CartItem => typeof i?.slug === 'string' && Number.isFinite(i?.quantity))
      .map((i) => ({ slug: i.slug, quantity: clamp(i.quantity) }))
      .filter((i) => i.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children, catalog }: { children: React.ReactNode; catalog: CartCatalogItem[] }) {
  const productMap = useMemo(() => new Map(catalog.map((p) => [p.slug, p])), [catalog]);
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false, hydrated: false });
  const skipFirstWrite = useRef(true);

  useEffect(() => {
    dispatch({ type: 'hydrate', items: readStorage() });
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) dispatch({ type: 'hydrate', items: readStorage() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    if (skipFirstWrite.current) {
      skipFirstWrite.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable (private mode) — cart still works for this visit */
    }
  }, [state.items, state.hydrated]);

  const lines = useMemo<CartLine[]>(
    () =>
      state.items.flatMap((item) => {
        const product = productMap.get(item.slug);
        if (!product || product.availability !== 'available') return [];
        const unitPrice = product.price;
        return [{ product, quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity }];
      }),
    [state.items, productMap],
  );

  const add = useCallback((slug: string, quantity = 1) => {
    const product = productMap.get(slug);
    if (!product || product.availability !== 'available') return;
    dispatch({ type: 'add', slug, quantity });
    track('add_to_cart', { slug, quantity, price: product.price });
  }, [productMap]);
  const setQuantity = useCallback((slug: string, quantity: number) => dispatch({ type: 'setQty', slug, quantity }), []);
  const remove = useCallback((slug: string) => {
    dispatch({ type: 'remove', slug });
    track('remove_from_cart', { slug });
  }, []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const open = useCallback(() => dispatch({ type: 'open' }), []);
  const close = useCallback(() => dispatch({ type: 'close' }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      isOpen: state.isOpen,
      hydrated: state.hydrated,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    }),
    [lines, state.isOpen, state.hydrated, add, setQuantity, remove, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
