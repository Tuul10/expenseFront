import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const ThemeContext = createContext([]);

export const ThemeContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userid");

    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }

    setIsLoading(false);
  }, [isLoading]);

  const signin = async (userid) => {
    setIsLoading(true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userid,
      })
    );

    setCurrentUser({
      userId,
    });

    setIsLoading(false);
    router.push("/");
  };

  // const getCategory = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/category`);
  //     const categories = response.data.categories.map((category) => {
  //       return { ...category, selected: true };
  //     });

  //     setCategories(categories);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getCategory();
  // }, []);

  const getRecord = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/records`
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
    <ThemeContext.Provider value={{ records, currentUser, isLoading, signin }}>
      {children}
    </ThemeContext.Provider>
  );
};
