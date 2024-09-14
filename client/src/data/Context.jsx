import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { urlenCode } from "../util/basic";

export const DataContext = createContext();

export function ContextProvider({ children }) {
  // this will store the state of the sign cards
  // we will need to prompt the sign cards from inside a lot of components
  const [visible, setVisible] = useState({
    signin: false,
    signup: false,
  });
  const [data, setData] = useState([]);
  let [mapped, setMapped] = useState({});

  // get 1 page of blog from db
  useEffect(() => {
    console.log("back");
    fetch("http://127.0.0.1:3000/blogs/page/1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data[0]);
        return setData((prev) => [...prev, ...data]);
      });
  }, []);

  //   Mapped titles to data - Not working as expected
  useEffect(() => {
    if (data.length > 0) {
      const newMapped = data.reduce((_mapped, post) => {
        _mapped[urlenCode(post.blog.title)] = post.blog;
        return _mapped;
      }, {});
      setMapped(newMapped);
    }
  }, [data]); // Re-run this effect when `data` changes
  return (
    <DataContext.Provider
      value={{ data, setData, mapped, visible, setVisible }}
    >
      {children}
    </DataContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
