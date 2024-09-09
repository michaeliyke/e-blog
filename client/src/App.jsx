import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
