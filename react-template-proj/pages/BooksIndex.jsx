import { bookService } from '../services/book.service.js'
import { BooksList } from '../cmps/BooksList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

const { useState, useEffect, useRef } = React

export function BooksIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function onSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
  }

  // console.log(books)

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log('err:', err)
      })
  }

  if (!books) return <AppLoader />

  return (
    <main className='books-index-page'>
      <h1 className='index-title'>Welcome to Miss Book</h1>
      <BooksFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      {selectedBookId ? <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} /> : <BooksList onSelectedBookId={onSelectedBookId} books={books} />}
    </main>
  )
}
