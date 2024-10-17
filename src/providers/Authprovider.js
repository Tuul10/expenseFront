import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("userid");

    if (user) {
      const parseduser = JSON.parse(user);
      setCurrentUser(parseduser);
    }
    setIsLoading(false);
  }, [isLoading]);

  const signin = async (userid) => {
    localStorage.setItem("userid", JSON.stringify(userid));
    setCurrentUser(userid);
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signin,
        setIsLoading,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
