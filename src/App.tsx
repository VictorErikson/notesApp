import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ModeProvider } from "./context/ModeContext";
// import { useState, useEffect } from "react";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Archived from "./pages/Archived/Archived";
import Tags from "./pages/Tags/Tags";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import { UserContext, userData } from "./context/AuthContext";
import { useState } from "react";
import { Users } from "../public/api/types";
import NewNote from "./pages/NewNote/NewNote";

const App = () => {
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

  const [user, setUser] = useState<Users>(userData);

  return (
    <ModeProvider>
      <UserContext.Provider value={user}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Archived" element={<Archived />} />
            <Route path="/Tags" element={<Tags />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ModeProvider>
  );
};

export default App;
