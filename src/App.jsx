import React from "react";
import Path from "./routes/Path";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <ToastProvider>
      <Path />
    </ToastProvider>
  );
};

export default App;
