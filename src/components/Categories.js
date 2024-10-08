import Category from "./Category";
import { useEffect, useState } from "react";
import axios from "axios";

export const Categories = (props) => {
  const { categories, setCategories } = props;

  const deleteCategory = async (categoryid) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/category/${categoryid}`
      );
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.categoryid !== categoryid)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-base text-[#1F2937] mb-3">
        Categories
      </h1>
      {categories?.map((category) => {
        return (
          <div
            className="flex items-center justify-center"
            key={category.categoryid}
          >
            <Category categoryName={category.category_name} />
            <button
              className="text-black ml-4 "
              onClick={() => deleteCategory(category.categoryid)}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};
