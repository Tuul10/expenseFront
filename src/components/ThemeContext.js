import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext([]);

export const ThemeContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category`);
      const categories = response.data.categories.map((category) => {
        return { ...category, selected: true };
      });

      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const getRecord = async () => {
    try {
      const response = await axios.get("http://localhost:8000/records");
      setRecords(response.data.records);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecord();
  }, []);

  return (
    <ThemeContext.Provider value={{ records }} value2={{ categories }}>
      {children}
    </ThemeContext.Provider>
  );
};
