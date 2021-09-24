import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startGeofencingAsync } from "expo-location";
import { RootState } from "../store";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface Cart {
  id: string;
  name: string;
  image: string;
  items: CartItem[];
}

interface IPayload {
  id: string;
  name: string;
  image: string;
  item: CartItem;
}

const initialState: {
  cart: Cart[];
} = { cart: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IPayload>) => {
      if (state.cart.find((item) => item.id === action.payload.id)) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            if (item.items.find((p) => p.id === action.payload.item.id)) {
              const items = item.items.map((product) => {
                if (product.id === action.payload.item.id) {
                  return {
                    ...product,
                    ...action.payload.item,
                  };
                } else {
                  return product;
                }
              });

              return {
                ...item,
                items,
              };
            } else {
              return {
                ...item,
                items: [...item.items, { ...action.payload.item }],
              };
            }
          } else {
            return item;
          }
        });
      } else {
        state.cart = [
          ...state.cart,
          {
            id: action.payload.id,
            name: action?.payload?.name,
            image: action.payload.image,
            items: [action.payload.item],
          },
        ];
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; itemId?: string }>,
    ) => {
      if (action.payload.itemId) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            const items = item.items.filter(
              (product) => product.id !== action.payload.itemId,
            );
            return {
              ...item,
              items,
            };
          } else {
            return item;
          }
        });
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },

    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

const cartReducer = cartSlice.reducer;

export default cartReducer;
