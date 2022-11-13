const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let result = 0;
  for (let i = 0; i < blogs.length; ++i) {
    result += blogs[i].likes;
  }
  return result;
};

const favouriteBlog = (blogs) => {
  // empty list
  if (blogs.length <= 0) {
    return null;
  }

  let top = blogs[0];

  for (let i = 1; i < blogs.length; ++i) {
    if (top.likes < blogs[i].likes) {
      top = blogs[i];
    }
  }

  return (({ title, author, likes }) => ({ title, author, likes }))(top);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
