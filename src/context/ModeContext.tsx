import { createContext, useContext, useState, useEffect } from "react";

const ModeContext = createContext<{
  mode: "light" | "dark";
  toggleMode: () => void;
  resetToSystemMode: () => void;
} | null>(null);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getSystemMode = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const initializeMode = (): "light" | "dark" => {
    const storedMode = localStorage.getItem("mode") as "light" | "dark";
    return storedMode || getSystemMode();
  };

  const [mode, setMode] = useState<"light" | "dark">(initializeMode);

  // Sync mode with document body and localStorage
  useEffect(() => {
    document.body.className = mode;
    localStorage.setItem("mode", mode);
  }, [mode]);

  // Update mode if the system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("mode")) {
        setMode(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Reset mode to system default
  const resetToSystemMode = () => {
    localStorage.removeItem("mode");
    setMode(getSystemMode());
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, resetToSystemMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};

// import { createContext, useContext, useState, useEffect } from "react";

// const ModeContext = createContext<{
//   mode: "light" | "dark";
//   toggleMode: () => void;
// } | null>(null);

// export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const getSystemMode = (): "light" | "dark" => {
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   };

//   const [mode, setMode] = useState<"light" | "dark">(() => {
//     return (
//       (localStorage.getItem("mode") as "light" | "dark") || getSystemMode()
//     );
//   });

//   useEffect(() => {
//     document.body.className = mode;
//     localStorage.setItem("mode", mode);
//   }, [mode]);

//   const toggleMode = () => {
//     setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//   };

//   return (
//     <ModeContext.Provider value={{ mode, toggleMode }}>
//       {children}
//     </ModeContext.Provider>
//   );
// };

// export const useMode = () => {
//   const context = useContext(ModeContext);
//   if (!context) {
//     throw new Error("useMode must be used within a ModeProvider");
//   }
//   return context;
// };
//Setting mode
// const getSystemMode = (): "light" | "dark" => {
//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";
// };

// const [mode, setMode] = useState<"light" | "dark">(() => getSystemMode());

// useEffect(() => {
//   document.body.className = mode;
// }, [mode]);

//change this when the mode-setting is done
// const toggleMode = () => {
//   setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
// };
