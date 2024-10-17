import { ThemeContext, ThemeContextProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/Authprovider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </ThemeContextProvider>
    </AuthProvider>
  );
}
