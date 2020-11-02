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
      title:blogs[maxIndex].title,
      author:blogs[maxIndex].author,
      likes:blogs[maxIndex].likes
    }
    return favouriteBlog
  } else {
    return []
  }
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}