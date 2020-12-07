/* eslint-disable no-undef */
const user = {
  username: "test username",
  password: "test password",
  name:"test name"
}
describe('Blog front page', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('username')
  })
  describe('Login', function () {
    beforeEach(function () {
      cy.get('#username').clear()
      cy.get('#password').clear()
    })

    it('login fails with wrong password', function () {

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('login').click()

      cy.contains('login successful')
    })


    it('login fails with wrong password', function () {

      cy.get('#username').type('wrongusernamee')
      cy.get('#password').type('verywrongpass')
      cy.contains('login').click()

      cy.contains('wrong credentials')
    })

  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('login').click()

      cy.contains('login successful')
    })

    it('A blog can be created, liked, removed and are ordered correctly', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('titleeee')
      cy.get('#author').type('authorr')
      cy.get('#url').type('urlll')
      cy.contains('create').click()
      cy.contains("added")
      cy.contains('titleeee')
      cy.visit('http://localhost:3000')

      cy.contains('View').click()
      cy.contains("likes 0")
      cy.contains('like').click()
      cy.contains("likes 1")

      cy.contains("remove").click()
      //make new blog
      cy.contains('New Blog').click()
      cy.get('#title').type('titleeee1')
      cy.get('#author').type('authorr1')
      cy.get('#url').type('urlll')
      cy.contains('create').click()

      cy.contains('View').click()
      cy.contains('like').click()


      cy.contains('New Blog').click()
      cy.get('#title').type('titleeee2')
      cy.get('#author').type('authorr2')
      cy.get('#url').type('urlll')
      cy.contains('create').click()


      cy.contains('View').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()

      cy.visit('http://localhost:3000')
      cy.contains("authorr1").contains("View").click()
      cy.contains('likes 4')
      cy.contains("Hide").click()

      cy.contains("authorr2").contains("View").click()
      cy.contains("likes 0")

    })
  })
})
