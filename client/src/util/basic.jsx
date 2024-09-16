import PropTypes from 'prop-types';

export function urlenCode(str) {
  return str.replace(/\s+/g, '-');
}

export const urlComponentSchema = {
  post_title: PropTypes.string.isRequired,
};

export const blogPostSchema = {
  post: PropTypes.shape({
    bookmarked: PropTypes.bool,
    numOfLikes: PropTypes.number,
    _id: PropTypes.string,
    numOfComments: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      href: PropTypes.string,
    }),
  }).isRequired,
};
