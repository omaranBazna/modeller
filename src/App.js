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
  const [profile, setProfile] = useState({
    name: "username",
    url: "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k=",
  });
  return (
    <div className="App">
      {user && <Navbar profile={profile} user={user} setUser={setUser} />}

      <Routes>
        <Route
          path="/design"
          element={<Design selected={selected} user={user} setUser={setUser} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              profile={profile}
              setProfile={setProfile}
              selected={selected}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              setProfile={setProfile}
              setSelected={setSelected}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
