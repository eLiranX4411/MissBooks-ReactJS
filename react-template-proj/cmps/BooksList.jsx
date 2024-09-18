import { BooksPreview } from '../cmps/BooksPreview.jsx'

export function BooksList({ books, onSelectedBookId }) {
  return (
    <section className='books-list'>
      {books.map((books) => (
        <BooksPreview onSelectedBookId={onSelectedBookId} key={books.id} books={books} />
      ))}
    </section>
  )
}
