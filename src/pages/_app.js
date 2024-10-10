import { ThemeContext, ThemeContextProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
      <Toaster />
    </ThemeContextProvider>
  );
}
