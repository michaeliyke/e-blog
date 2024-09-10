import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Posts } from "./scenes/Posts";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:post_title" element={<Posts />} />
    </Routes>
  );
}

export default App;
