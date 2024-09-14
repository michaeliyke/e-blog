import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Posts } from "./scenes/Posts";
import { CreatePost } from "./scenes/CreatePost";
import { PrivateRoute } from "./components/PrivateRoute";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute open={true} element={Home} />} />
      <Route path="/post/new" element={<PrivateRoute element={CreatePost} />} />
      <Route path="/posts/:post_title" element={<Posts />} />
      {/* <PrivateRoute path='/profile' element={Profile} /> */}
    </Routes>
  );
}

export default App;
