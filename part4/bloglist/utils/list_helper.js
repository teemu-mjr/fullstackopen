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
    return undefined;
  }

  let top = blogs[0];

  for (let i = 1; i < blogs.length; ++i) {
    if (top.likes < blogs[i].likes) {
      top = blogs[i];
    }
  }

  return (({ title, author, likes }) => ({ title, author, likes }))(top);
};

const mostBlogs = (blogs) => {
  resultArray = [];

  for (let i = 0; i < blogs.length; ++i) {
    for (let j = 0; j < resultArray.length; ++j) {
      if (blogs[i].author === resultArray[j].author) {
        resultArray[j].blogs += 1;
        break;
      }
    }
    resultArray.push({
      author: blogs[i].author,
      blogs: 1,
    });
  }

  let top = resultArray[0];
  for (let i = 1; i < resultArray.length; ++i) {
    if (resultArray[i].blogs > top.blogs) {
      top = resultArray[i];
    }
  }

  return top;
};

const mostLikes = (blogs) => {
  resultArray = [];

  for (let i = 0; i < blogs.length; ++i) {
    for (let j = 0; j < resultArray.length; ++j) {
      if (blogs[i].author === resultArray[j].author) {
        resultArray[j].likes += blogs[i].likes;
        break;
      }
    }
    resultArray.push({
      author: blogs[i].author,
      likes: blogs[i].likes,
    });
  }

  let top = resultArray[0];
  for (let i = 1; i < resultArray.length; ++i) {
    if (resultArray[i].likes > top.likes) {
      top = resultArray[i];
    }
  }

  return top;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
