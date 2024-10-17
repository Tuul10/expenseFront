import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({
  currentUser: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("userid");

    // if (user) {
    //   const parsedUser = JSON.parse(user);
    //   setCurrentUser(parsedUser);
    // }
    setCurrentUser(user);

    setIsLoading(false);
  }, [isLoading]);

  //   const signin = async (userid) => {
  //     setIsLoading(true);
  //     localStorage.setItem(
  //       "userid",
  //       JSON.stringify({
  //         userid,
  //       })
  //     );

  //     setCurrentUser({
  //       userid,
  //     });

  //     setIsLoading(false);
  //     router.push("/");
  //   };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        setIsLoading,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
