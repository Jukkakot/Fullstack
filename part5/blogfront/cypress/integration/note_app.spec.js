/* eslint-disable no-undef */
const user = {
  username: "test username",
  password: "test password"
}
describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('username')
  })
  describe('Login',function() {
    beforeEach(function() {
      cy.get('#username').clear()
      cy.get('#password').clear()
    })

    it.only('login fails with wrong password', function() {

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('login').click()

      cy.contains('login successful')
    })


    it.only('login fails with wrong password', function() {

      cy.get('#username').type('wrongusernamee')
      cy.get('#password').type('verywrongpass')
      cy.contains('login').click()

      cy.contains('wrong credentials')
    })
  })
})