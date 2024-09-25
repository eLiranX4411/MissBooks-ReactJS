import { bookService } from '../services/book.service.js'
import { BooksList } from '../cmps/BooksList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

const { useState, useEffect, useRef } = React

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
        console.log('err:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        // showSuccessMsg(`Car removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
        // showErrorMsg(`Problems removing book (${bookId})`)
      })
  }

  if (!books) return <AppLoader />

  return (
    <main className='books-index-page'>
      <h1 className='index-title'>Welcome to Miss Book</h1>
      <button>Add book</button>
      <BooksFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <BooksList books={books} onRemoveBook={onRemoveBook} />
    </main>
  )
}
