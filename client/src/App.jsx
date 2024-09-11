import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Posts } from "./scenes/Posts";
import { ContextProvider } from "./data/Context";
import "./index.css";

function App() {
  return (
	  <ContextProvider>
		<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/posts/:post_title" element={<Posts />} />
		</Routes>
	  </ContextProvider>
  );
}

export default App;
