/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
function f() { }
const blog = {
  title: "testTitle",
  author: "testAuthor",
  url: "testUrl",
  likes: 12
}
describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeABlog={mockHandler} delBlog={f} user={{}} />
    )
  })

  test('renders content right', () => {
    const viewButton = component.getByText('View')

    expect(component.container).toHaveTextContent("testTitle")
    expect(component.container).toHaveTextContent("testAuthor")
    expect(component.container).not.toHaveTextContent("testUrl")
    expect(component.container).not.toHaveTextContent("12")

    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent("testUrl")
    expect(component.container).toHaveTextContent("12")

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})