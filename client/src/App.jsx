import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Posts } from "./scenes/Posts";
import { ContextProvider } from "./data/Context";
import { CreatePost } from "./scenes/CreatePost";

import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute open={true} element={Home} />} />
        <Route path="/posts/:post_title" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        {/* <PrivateRoute path='/profile' element={Profile} /> */}
      </Routes>
    </ContextProvider>
  );
}

export default App;
