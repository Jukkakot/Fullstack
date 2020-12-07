/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'
function f (){}
test('renders content', () => {
  const blog = {
    title:"testTitle",
    author:"testAuthor",
    url:"testUrl",
    likes:12
  }
  const component = render(
    <Blog blog={blog} likeABlog ={f} delBlog ={f} user={{}} />
  )

  expect(component.container).toHaveTextContent("testTitle")
  expect(component.container).toHaveTextContent("testAuthor")
  expect(component.container).not.toHaveTextContent("testUrl")
  expect(component.container).not.toHaveTextContent("12")
})