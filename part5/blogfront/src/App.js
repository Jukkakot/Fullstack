import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import "./App.css"
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(async () => {
    // const userBlogs = await userService.getBlogs(user)
    //   setBlogs(userBlogs)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }
  }, [])
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // console.log(user)
      // const userBlogs = await userService.getBlogs(user)
      // setBlogs(userBlogs)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        user:user,
        title:newBlogTitle,
        author:newBlogAuthor,
        url:newBlogUrl
      }
      const newBlog = await blogService.create(blog)
      // const copyBlogs = [...blogs]
      // copyBlogs.push(newBlog)
      // setBlogs(copyBlogs)

      setNewBlogAuthor("")
      setNewBlogTitle("")
      setNewBlogUrl("")
      setErrorMessage("a new blog "+newBlogTitle+" by "+newBlogAuthor+" added")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const blogForm = () => (
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

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App