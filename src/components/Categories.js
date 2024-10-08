import Category from "./Category";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryState } from "nuqs";

export const Categories = (props) => {
  const { categories, setCategories, filterCategories } = props;
  const [categoryName, setCategoryName] = useQueryState("");

  const deleteCategory = async (categoryid) => {
    try {
      await axios.delete(`http://localhost:8000/category/${categoryid}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.categoryid !== categoryid)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectcategory = (name) => {
    setCategoryName(name);
  };
  // const SelectCategoryName = (e) => {
  //   setCategoryName(e.target.value);
  // };

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
            value={category.category_name}
            onClick={() => handleSelectcategory(category.category_name)}
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
