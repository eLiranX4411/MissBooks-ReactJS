import { bookService } from '../services/book.service.js'
import { AppLoader } from '../cmps/AppLoader.jsx'
import { BookReview } from '../cmps/BookReview.jsx'

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log('Problem getting book', err)
        navigate('/book')
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

  function onBack() {
    navigate('/book')
  }

  function onAddReview(reviewData) {
    bookService
      .addReview(params.bookId, reviewData)
      .then(() => {
        console.log('Review Added!')
        loadBook()
      })
      .catch((err) => {
        console.error('Error adding review', err)
      })
  }

  if (!book) return <AppLoader />

  return (
    <React.Fragment>
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
        <section className='prev-next-btns'>
          <Link to={`/book/${book.prevBookId}`}>
            <button>Prev</button>
          </Link>
          <Link to={`/book/${book.nextBookId}`}>
            <button>Next</button>
          </Link>
        </section>
      </section>
      <section className='review-details'>
        <BookReview bookId={params.bookId} onAddReview={onAddReview} />
      </section>

      <section className='reviews-list'>
        <h3>User Reviews</h3>
        {book.reviews && book.reviews.length > 0 ? (
          <ul>
            {book.reviews.map((review, idx) => (
              <li key={idx}>
                <p>
                  <strong>Name:</strong> {review.name}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}/5
                </p>
                <p>
                  <strong>Read At:</strong> {review.readAt}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </section>
    </React.Fragment>
  )
}

/*
  function onAddReview(review) {
    if (review === `name`) return prompt('Enter Full Name:')
    if (review === `rating`) return prompt('Enter Rating 1-5:')
    if (review === `readAt`) return Date.now()
    return review
  }
  */
