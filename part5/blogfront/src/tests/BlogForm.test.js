/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm createBlog ={mockHandler}/>
    )
  })

  test('<BlogForm updates parent state and calls onSubmit', () => {

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'test title' }
    })
    fireEvent.change(author, {
      target: { value: 'test author' }
    })
    fireEvent.change(url, {
      target: { value: 'test url' }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler.mock.calls[0][0].title).toBe("test title")
    expect(mockHandler.mock.calls[0][0].author).toBe("test author")
    expect(mockHandler.mock.calls[0][0].url).toBe("test url")
  })

})