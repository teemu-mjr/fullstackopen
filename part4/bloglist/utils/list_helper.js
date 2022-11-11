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

module.exports = {
  dummy,
  totalLiked: totalLikes,
};
