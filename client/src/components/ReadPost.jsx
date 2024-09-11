import { useContext } from "react";
import { DataContext } from '../data/Context';
import PropTypes from 'prop-types';

export function ReadPost ({post_title, children}) {
	const {mapped} = useContext(DataContext);
	const post = mapped[post_title]; // {title, text, _id}
	if(!post) { // if post is not found in mapped due to async fetch of data
		return <div>Loading...</div>;
	}
  return (
   <div>
		<h1 className="text-3xl font-bold">{post.title}</h1>
		<p>{post.text}</p>
		{children}
   </div>
  );
}

ReadPost.propTypes = {
  post_title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
