import { bookService } from '../services/book.service.js'
import { AppLoader } from '../cmps/AppLoader.jsx'

const { useState, useEffect, useRef } = React

export function BookDetails({ onBack, bookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    // console.log(book)

    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log('Problem getting book', err)
      })
  }

  function pageCountText() {
    if (book.pageCount > 500) {
      return 'Serious Reading'
    }

    if (book.pageCount > 200) {
      return 'Descent Reading'
    }

    if (book.pageCount < 100) {
      return 'Light Reading'
    }
  }

  function publishedDateText() {
    var currentdate = new Date()
    var dateyear = currentdate.getFullYear()
    // console.log(book.publishedDate, dateyear - 1)

    if (book.publishedDate < dateyear - 10) {
      return 'Vintage..'
    }

    if (book.publishedDate >= dateyear - 1) {
      return 'New!'
    }
  }

  function amountColor() {
    if (book.listPrice.amount > 150) return 'red'
    if (book.listPrice.amount < 20) return 'green'
  }

  function isOnSale() {
    return book.listPrice.isOnSale ? 'On Sale !!!' : 'Not on the sale...'
  }

  // if (!book) return <h1>Loading....</h1>
  if (!book) return <AppLoader />

  return (
    <section className='book-detail'>
      <img className='detail-thumbnail' src={`./assets/img/${book.thumbnail}`} alt='Book Thumbnail' />
      <h2 className='detail-title'>Movie Title: {book.title}</h2>
      <h2 className='detail-authors'>Movie Authors: {book.authors}</h2>
      <h3 className='detail-desc'>Description: {book.description}</h3>
      <h4 className='detail-desc'>
        publishedDate: {book.publishedDate}, {publishedDateText()}
      </h4>
      <h4 className='detail-pageCount'>
        Page Count: {book.pageCount}, {pageCountText()}
      </h4>
      <ul className='detail-book-pricelist'>
        <li className={`detail-amount ${amountColor()}`}>Price: {book.listPrice.amount}</li>
        <li className='detail-currency'>{book.listPrice.currencyCode}</li>
        <li className='detail-onsale'>
          {book.listPrice.isOnSale}, {isOnSale()}
        </li>
      </ul>
      <p className='categories'>Categories: {book.categories}</p>
      <p className='language'>Language: {book.language}</p>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
