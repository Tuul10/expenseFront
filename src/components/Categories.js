import useSWR from "swr";
import Category from "./Category";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Categories = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/category",
    fetcher
  );
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1 className="font-semibold text-base text-[#1F2937] mb-3">
        Categories
      </h1>
      {data.map((category) => {
        return (
          <Category
            data={data}
            key={category.categoryid}
            categoryName={category.category_name}
          />
        );
      })}
    </div>
  );
};
