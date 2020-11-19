const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')
beforeAll(async () => {
    const user = {
        name:"nameKayttaja",
        username:"userKayttaja",
        password:"passKayttaja"
    }
    await api.post("/api/users").send(user)
})
beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    // const user = {
    //     name:"nameKayttaja",
    //     username:"userKayttaja",
    //     password:"passKayttaja"
    // }
    // await api.post("/api/users").send(user)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
        "React patterns"
    )
})

test('a valid blog can be added', async () => {
    const user = {
        username: "userKayttaja",
        password: "passKayttaja"
    }
    const response = await api
        .post("/api/login")
        .send(user)
        .expect(200)
    const token ="bearer "+ response.body.token
    const newBlog = {
        title: "This is new title",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        "This is new title"
    )
})

test('blog without likes defaults to 0 likes ', async () => {
    const user = {
        username: "userKayttaja",
        password: "passKayttaja"
    }
    const response = await api
        .post("/api/login")
        .send(user)
        .expect(200)
    const token ="bearer "+ response.body.token
    const newBlog = {
        title: "This is new title",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[likes.length - 1]).toBe(0)
})

test('blog identification variable is "id', async () => {
    const user = {
        username: "userKayttaja",
        password: "passKayttaja"
    }
    const response = await api
        .post("/api/login")
        .send(user)
        .expect(200)
    const token ="bearer "+ response.body.token

    const newBlog = {
        title: "This is new title",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


    expect(blogsAtEnd[0].id).toBeDefined()
})
test('blog without title and url is not added', async () => {
    const user = {
        username: "userKayttaja",
        password: "passKayttaja"
    }
    const response = await api
        .post("/api/login")
        .send(user)
        .expect(200)
    const token ="bearer "+ response.body.token
    const newBlog = {
        author: "Edsger W. Dijkstra",
        likes: 12,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
afterAll(async () => {
    await api.delete("/api/users")
    mongoose.connection.close()
})