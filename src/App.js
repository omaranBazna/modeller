import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Design from "./Pages/Design";
import Profile from "./Pages/Profile";
import Models from "./Pages/Models";
function App() {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/design"
          element={<Design selected={selected} user={user} setUser={setUser} />}
        />
        <Route
          path="/profile"
          element={
            <Profile selected={selected} user={user} setUser={setUser} />
          }
        />
        <Route
          path="/"
          element={
            <Home setSelected={setSelected} user={user} setUser={setUser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
