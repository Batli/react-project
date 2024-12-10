"use client";


import {  useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const GlobalContextWrapper = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [storeData, setStoreData] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchStr, setSearchStr] = useState('')
  const [storeSort, setStoreSort] = useState(null)
  const [alpha, setAlpha] = useState(null)


  
  return (
    <GlobalContext.Provider
      value={{
        categories, setCategories,
        storeData, setStoreData,
        selectedCategoryId, setSelectedCategoryId,
        searchStr, setSearchStr,
        storeSort, setStoreSort,
        alpha, setAlpha,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextWrapper"
    );
  }

  return globalContext;
};

export default GlobalContextWrapper;
