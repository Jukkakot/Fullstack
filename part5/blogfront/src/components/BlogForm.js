import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogUrl("")
  }
  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          value={newBlogTitle}
          onChange={t => setNewBlogTitle(t.target.value)}
        />
      </div>
      <div>
          author:
        <input
          value={newBlogAuthor}
          onChange={t => setNewBlogAuthor(t.target.value)}
        />
      </div>
      <div>
          url:
        <input
          value={newBlogUrl}
          onChange={t => setNewBlogUrl(t.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm