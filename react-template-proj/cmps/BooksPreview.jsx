const { Link } = ReactRouterDOM

export function BooksPreview({ books, onRemoveBook }) {
  return (
    <div className='book-card'>
      <img title='Click for more details...' className='thumbnail' src={`./assets/img/${books.thumbnail}`} alt='Book Thumbnail' />
      <h2 className='title'>{books.title}</h2>
      <button onClick={() => onRemoveBook(books.id)}>Remove</button>
      <Link to={`/book/${books.id}`}>
        <button>Details</button>
      </Link>
    </div>
  )
}
