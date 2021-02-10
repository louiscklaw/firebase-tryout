//1.
import React, { useEffect, useState } from "react";
import app from "./app";

//2.
export const StorageContext = React.createContext();

//3.
export const StorageProvider = ({ children }) => {
  return (
    <StorageContext.Provider value={{}}>{children}</StorageContext.Provider>
  );
};
