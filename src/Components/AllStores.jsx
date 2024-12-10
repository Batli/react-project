import React from "react";
import StoreApi from "../storeapi";

const AllStores = ({ className }) => {
  return (
    <div className={`my-[50px] ${className}`}>Show All Stores Data here...
    <StoreApi/>
    </div>
  );
};

export default AllStores;
