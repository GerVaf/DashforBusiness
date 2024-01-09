import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // You'll need to install jwt-decode

export const RouteGuard = ({ children }) => {
  const token = Cookies.get("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      const currentTime = Date.now() / 1000;
      // console.log(currentTime);
      if (decodedToken.exp < currentTime) {
        // Token is expired
        return <Navigate to="/login" />;
      }

      return children;
    } catch (error) {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default RouteGuard;
