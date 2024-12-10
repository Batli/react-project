import React from "react";
import Api from "../categoryapi";

const Categories = ({ className, onClick }) => {
  return (
    <>
    <div className={`${className} my-[50px]`}>Show Categories List here...
    <Api/>
    </div>
    </>
  );
};

export default Categories;
