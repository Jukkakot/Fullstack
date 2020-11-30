const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('', async (request, response) => {
  //const blogs = await Blog.find({})
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    response.status(201).json(savedBlog.toJSON())
    await user.save()

  } catch (exception) {
    next(exception)
  }
})
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const id = request.params.id
    const blog = await Blog.findById(id)


    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: "user does not match blog owner" })
    }
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    await Blog.findByIdAndUpdate(id, blog)
    response.status(201).end()
  } catch (error) {
    next(error)
  }

})


module.exports = blogsRouter