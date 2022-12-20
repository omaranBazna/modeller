import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Design from "./Pages/Design";
import Models from "./Pages/Models";
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/models" element={<Models user={user} />} />
        <Route path="/design" element={<Design user={user} />} />
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
