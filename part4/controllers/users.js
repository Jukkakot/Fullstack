const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  if (body.password === undefined || body.password.length < 3) {
    return response.status(400).json({
      error: "password has to be minimum of 3 characters"
    }
    )
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
  }

})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  //  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})
usersRouter.delete('/', async (request, response, next) => {
  try {
    await User.deleteMany()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
module.exports = usersRouter