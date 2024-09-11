import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { urlenCode } from '../util/basic';

export const DataContext = createContext();

export function ContextProvider ({children}) {
	const [data, setData] = useState([]);
  	let [mapped, setMapped] = useState({});

	// get all the blog and store then in data
  useEffect(() => {
    fetch("http://127.0.0.1:3000/blogs/")
      .then((response) => {
		return response.json();
      }).then((data) => {
        // console.log(data[0]);
        return setData((prev) => [...prev, ...data]);
      });
	  }, []);

	//   Mapped titles to data - Not working as expected
	useEffect(() => {
		if(data.length > 0) {
			const newMapped = data.reduce((_mapped, post) => {
			_mapped[urlenCode(post.title)] = post;
			return _mapped;
		}, {});
		setMapped(newMapped);
		}
	}, [data]); // Re-run this effect when `data` changes
  return (
	<DataContext.Provider value={{ data, setData, mapped }}>
		{children}
	</DataContext.Provider>
  );
};

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
