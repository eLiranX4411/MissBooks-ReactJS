export function BooksPreview({ books, onSelectedBookId }) {
  return (
    <div className='book-card'>
      <img
        title='Click for more details...'
        onClick={() => onSelectedBookId(books.id)}
        className='thumbnail'
        src={`./assets/img/${books.thumbnail}`}
        alt='Book Thumbnail'
      />
      <h2 className='title'>{books.title}</h2>
    </div>
  )
}
