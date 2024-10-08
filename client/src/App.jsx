import { Routes, Route } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Posts } from "./scenes/Posts";
import { CreatePost } from "./scenes/CreatePost";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./scenes/Profile";
import { ProfileSettings } from "./scenes/ProfileSettings";
import { NotFoundPage, NotFoundRedirect } from "./scenes/NotFound";
import "./index.css";
import { TrendingPage } from "./scenes/TrendingPage";
import { UsersProfile } from "./scenes/UsersProfile";
import { Favorites } from "./scenes/Favorites";
import { About } from "./scenes/About";
import { UpdatePost } from "./scenes/UpdatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute open={true} element={Home} />} />
      <Route path="/post/new" element={<PrivateRoute element={CreatePost} />} />
      <Route
        path="/post/update"
        element={<PrivateRoute element={UpdatePost} />}
      />
      <Route
        path="/posts/:post_title"
        element={<PrivateRoute open={true} element={Posts} />}
      />

      {/* Public profile view */}
      <Route
        path="/user/:slug"
        element={<PrivateRoute open={true} element={UsersProfile} />}
      />
      <Route
        path="/posts/trending"
        element={<PrivateRoute open={true} element={TrendingPage} />}
      />

      {/* Private profile view */}
      <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      <Route
        path="/profile/settings"
        element={<PrivateRoute element={ProfileSettings} />}
      />
      <Route path="/favorites" element={<PrivateRoute element={Favorites} />} />

      {/* about page */}
      <Route
        path="/about"
        element={<PrivateRoute open={true} element={About} />}
      />

      {/* 404 route */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}

export default App;
