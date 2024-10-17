import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext([]);

export const ThemeContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const getRecord = async () => {
    const id = localStorage.getItem("userid");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/records/user/${id}`
      );
      setRecords(response.data.records);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecord();
  }, []);

  return (
    <ThemeContext.Provider value={{ records }}>
      {children}
    </ThemeContext.Provider>
  );
};
