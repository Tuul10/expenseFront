import Category from "./Category";
import { useEffect, useState } from "react";

export const Categories = (props) => {
  const { categories, handleSelectcategory } = props;

  return (
    <div>
      <h1 className="font-semibold text-base text-[#1F2937] mb-3">
        Categories
      </h1>
      <div className="flex flex-col">
        {categories?.map((category) => {
          return (
            <div
              className="flex items-center justify-center"
              key={category.categoryid}
              value={category.category_name}
              onClick={() => handleSelectcategory(category)}
              categoryId={category.categoryid}
            >
              <Category
                categoryName={category.category_name}
                selected={category.selected}
                // onSelect={onSelectedCategory(category)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
