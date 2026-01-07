import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('auth_token', token);
    set({ token, isAuthenticated: !!token });
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  cart: [],

  setOrders: (orders) => set({ orders }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, item],
  })),
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId),
  })),
  clearCart: () => set({ cart: [] }),
}));

export const useDishStore = create((set) => ({
  dishes: [],
  selectedCategory: 'all',

  setDishes: (dishes) => set({ dishes }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export const useNotificationStore = create((set) => ({
  notifications: [],
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),
}));