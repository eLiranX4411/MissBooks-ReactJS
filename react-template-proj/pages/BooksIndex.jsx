import { bookService } from '../services/book.service.js'
const { useState, useEffect, useRef } = React

export function BooksIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  console.log(books)

  function loadBooks() {
    bookService
      .query()
      .then(setBooks)
      .catch((err) => {
        console.log('err:', err)
      })
  }

  if (!books) return <h1>Loading....</h1>

  return <section className='books-container'></section>
}
