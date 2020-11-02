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
module.exports = {
  dummy,
  totalLikes
}