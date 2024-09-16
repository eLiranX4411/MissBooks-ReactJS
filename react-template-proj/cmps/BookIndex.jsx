import { bookService } from '../services/book.service'

const { useState, useEffect, useRef } = React

export function BookIndex({ books }) {
  const [books, setBooks] = useState(null)

  if (!books) return <h1>Loading....</h1>

  return (
    <section className='books-container'>
      <pre>
        {bookService.books.map((books) => {
          console.log(books)
        })}
      </pre>
    </section>
  )
}
