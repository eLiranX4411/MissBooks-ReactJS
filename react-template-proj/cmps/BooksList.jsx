import { BooksPreview } from '../cmps/BooksPreview.jsx'

export function BooksList({ books, onRemoveBook }) {
  return (
    <section className='books-list'>
      {books.map((books) => (
        <BooksPreview onRemoveBook={onRemoveBook} key={books.id} books={books} />
      ))}
    </section>
  )
}
