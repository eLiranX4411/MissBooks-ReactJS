import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React

export function BookReview({ bookId, onAddReview }) {
  const [review, setReview] = useState(bookService.getDefaultReview())

  function handleChange({ target }) {
    let { name, value } = target
    if (name === 'rating') {
      value = +value
    }
    // console.log(target)
    setReview((prevReview) => ({ ...prevReview, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!review.name || !review.rating) {
      alert('please fill out all fields.')
      return
    }
    onAddReview(review)
    setReview(bookService.getDefaultReview())
  }

  return (
    <section className='review-container'>
      <h2>Add a Review for Book #{bookId}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type='text' name='name' value={review.name} onChange={handleChange} />
        </label>

        <label>
          Rating:
          <input type='number' name='rating' value={review.rating} onChange={handleChange} min='1' max='5' />
        </label>

        <button type='submit'>Submit Review</button>
      </form>
    </section>
  )
}
