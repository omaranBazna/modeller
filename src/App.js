import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/models" element={<div>Model</div>} />
        <Route path="/design" element={<div>Log In</div>} />
        <Route path="/" element={<div>Welcome</div>} />
      </Routes>
    </div>
  );
}

export default App;
