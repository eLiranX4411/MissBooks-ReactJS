import { bookService } from '../services/book.service.js'
import { BooksList } from '../cmps/BooksList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BooksIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg(`Can't load books (${books})`)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book removed successfully!`)
      })
      .catch((err) => {
        console.error('Problems removing book:', err)
        showErrorMsg(`Problems removing book (${bookId})`)
      })
  }

  if (!books) return <AppLoader />

  return (
    <main className='books-index-page'>
      <h1 className='index-title'>Welcome to Miss Book</h1>
      <Link to='/book/add'>
        <button>Add a Book</button>
      </Link>
      <BooksFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <BooksList books={books} onRemoveBook={onRemoveBook} />
    </main>
  )
}
