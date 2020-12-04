import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog,user,likeABlog,delBlog }) => {
  const [visible, setVisible] = useState(false)
  const [bText, setBText] = useState("View")
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    // display: visible ? 'none' : ''
  }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const handleVisibleChange = () => {
    if (visible) {
      setBText("View")
    } else {
      setBText("Hide")
    }
    setVisible(!visible)
  }
  const handleLikeBlog = (event) => {
    event.preventDefault()
    likeABlog(blog)
  }
  const handleDelBlog = (event) => {
    event.preventDefault()

    if(window.confirm("Remove "+blog.title+" by "+blog.author)){
      delBlog(blog)
    }
  }

  return (
    <div style={blogStyle}  >
      <div>
        {blog.title} {blog.author} <button onClick={handleVisibleChange}>{bText}</button>
      </div>
      <div style={showWhenVisible} >
        <p>{blog.url} </p>
        <p>likes {blog.likes} <button onClick={handleLikeBlog}>like</button></p>
        <p>{blog.user ? blog.user.username : "null"} </p>
        {blog.user && user.username === blog.user.username ? <button onClick={handleDelBlog}>remove</button>: ""}
      </div>
    </div>
  )
}
Blog.propTypes = {
  likeABlog: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog