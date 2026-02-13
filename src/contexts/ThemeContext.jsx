import React, { createContext, useCallback, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {}

    // 👉 Default theme is always LIGHT (ignore system preference)
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const applyTheme = useCallback((t) => {
    const el = document.documentElement;
    el.classList.toggle("dark", t === "dark");
  }, []);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme, applyTheme]);

  // 👉 Sync with system theme only if user never chose manually
  // useEffect(() => {
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");

  //   const handler = (e) => {
  //     const stored = localStorage.getItem("theme");
  //     if (!stored) {
  //       setTheme(e.matches ? "dark" : "light");
  //     }
  //   };

  //   mq.addEventListener("change", handler);
  //   return () => mq.removeEventListener("change", handler);
  // }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
