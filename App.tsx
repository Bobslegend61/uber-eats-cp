import React from "react";
import { Provider } from "react-redux";
import AppIndex from "./AppIndex";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
}
