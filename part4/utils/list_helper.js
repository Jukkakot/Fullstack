var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var result = 0;

  blogs.forEach(blog => {
    result += blog.likes
  })
  return result
}
const favouriteBlog = (blogs) => {
  var maxIndex = -1
  var maxLikes = 0
  blogs.map((blog, index) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      maxIndex = index
    }
  })
  if (maxIndex != -1) {
    const favouriteBlog = {
      title: blogs[maxIndex].title,
      author: blogs[maxIndex].author,
      likes: blogs[maxIndex].likes
    }
    return favouriteBlog
  } else {
    return []
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return {}
  }
  const names = _.map(blogs, "author")
  const uniqnames = _.uniq(names)

  var maxName = ""
  var maxCount = 0
  _.forEach(uniqnames, function (name) {

    count = _.filter(blogs, function (blog) { return blog.author == name }).length
    if (count > maxCount) {
      maxCount = count
      maxName = name
    }
  })
  return {
    author: maxName,
    blogs: maxCount
  }
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}