import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ModeProvider } from "./context/ModeContext";

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
import NotesPage from "./pages/NotesPage/NotesPage";

const App = () => {
  const [user, setUser] = useState<Users>(userData);

  return (
    <ModeProvider>
      <UserContext.Provider value={user}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="/notes/:noteId" element={<NotesPage />} />
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
