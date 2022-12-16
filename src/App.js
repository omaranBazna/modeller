import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/models" element={<div>Model</div>} />
        <Route path="/design" element={<div>Log In</div>} />
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
