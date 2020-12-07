import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import blogService from './services/blogs'
import loginService from './services/login'
// import userService from './services/users'
import "./App.css"
import PropTypes from 'prop-types'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const noteFormRef = useRef()
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(async () => {
    // const userBlogs = await userService.getBlogs(user)
    //   setBlogs(userBlogs)
    const foundBlogs = await blogService.getAll()
    foundBlogs.sort(function (a, b) {
      return b.likes - a.likes;
    });
    setBlogs(foundBlogs)
  }, [])

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
  Notification.propTypes = {
    message: PropTypes.string
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
      setNotificationMessage('login successful')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
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
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const createBlog = async (blogObject) => {
    try {
      blogObject.user = user
      const newBlog = await blogService.create(blogObject)
      const copyBlogs = [...blogs]
      copyBlogs.push(newBlog)
      setBlogs(copyBlogs)

      noteFormRef.current.toggleVisibility()

      setNotificationMessage("a new blog " + newBlog.title + " by " + newBlog.author + " added")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage('error creating blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const likeABlog = async (blogObject) => {
    try {
      const copyObject = blogObject
      copyObject.likes++
      const likedBlog = await blogService.update(copyObject.id, copyObject)
      const copyBlogs = [...blogs]
      copyBlogs.splice(copyBlogs.indexOf(blogObject), likedBlog)
      setBlogs(copyBlogs)

      setNotificationMessage("Blog " + likedBlog.title + " by " + likedBlog.author + " updated")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage('error liking a blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const delBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      const copyBlogs = [...blogs]
      copyBlogs.splice(copyBlogs.indexOf(blogObject), 1)
      setBlogs(copyBlogs)

      setNotificationMessage("Blog " + blogObject.title + " by " + blogObject.author + " deleted")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage('error deleting a blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="New Blog" ref={noteFormRef}>
            <BlogForm createBlog={createBlog}></BlogForm>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} delBlog={delBlog} likeABlog={likeABlog} />
          )}
        </div>
      }


    </div>
  )
}

export default App