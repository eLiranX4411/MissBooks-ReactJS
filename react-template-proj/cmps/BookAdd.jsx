import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookAdd() {
  const [searchQuery, setSearchQuery] = useState('')
  const [bookResults, setBookResults] = useState([])

  const navigate = useNavigate()

  // Demo data
  useEffect(() => {
    bookService
      .getGoogleBookData(`Javascript`)
      .then((books) => {
        setBookResults(books)
      })
      .catch((err) => {
        console.error('Failed to fetch books', err)
        showErrorMsg(`Can't load books (${err.message})`)
      })
  }, [])

  function handleInputChange({ target }) {
    setSearchQuery(target.value)
  }

  function onSearchBooks() {
    bookService
      .getGoogleBookData(searchQuery)
      .then((books) => {
        setBookResults(books)
      })
      .catch((err) => {
        console.error('Failed to fetch books', err)
        showErrorMsg(`Can't load books (${err.message})`)
      })
  }

  function onAddBook(book) {
    bookService
      .addGoogleBook(book)
      .then((newBook) => {
        setBookResults(book)
        navigate(`/book`)

        console.log('Book added:', newBook)
        showSuccessMsg('Book added:', newBook)
      })
      .catch((err) => {
        console.error(err)

        showErrorMsg(`Added Book Failed`)
      })
  }

  return (
    <section className='search-book-container'>
      <label htmlFor='searchBook'>
        <input type='search' name='searchBook' value={searchQuery} onChange={handleInputChange} />
      </label>
      <button onClick={onSearchBooks}>Search</button>

      <section className='googlebooks-container'>
        {bookResults.map((book) => (
          <ul key={book.id}>
            <li>
              TITLE: {book.title}
              <button onClick={() => onAddBook(book)}>+</button>
            </li>
          </ul>
        ))}
      </section>
    </section>
  )
}
