import { bookService } from '../services/book.service.js'
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

  if (!book) return <h1>Loading....</h1>

  return (
    <section className='book-detail'>
      <img className='detail-thumbnail' src={`./assets/img/${book.thumbnail}`} alt='Book Thumbnail' />
      <h2 className='detail-title'>{book.title}</h2>
      <h3 className='detail-desc'>{book.description}</h3>
      <ul className='detail-book-pricelist'>
        <li className='detail-amount'>{book.listPrice.amount}</li>
        <li className='detail-currency'>{book.listPrice.currencyCode}</li>
        <li className='detail-onsale'>{book.listPrice.isOnSale}</li>
      </ul>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
