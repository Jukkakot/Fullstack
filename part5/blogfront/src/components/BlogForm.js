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
          id="title"
          value={newBlogTitle}
          onChange={t => setNewBlogTitle(t.target.value)}
        />
      </div>
      <div>
          author:
        <input
          id="author"
          value={newBlogAuthor}
          onChange={t => setNewBlogAuthor(t.target.value)}
        />
      </div>
      <div>
          url:
        <input
          id="url"
          value={newBlogUrl}
          onChange={t => setNewBlogUrl(t.target.value)}
        />
      </div>
      <button id ="createBlog"type="submit">create</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm