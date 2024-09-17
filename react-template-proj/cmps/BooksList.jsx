import { BooksPreview } from '../cmps/BooksPreview.jsx'

export function BooksList({ books }) {
  return (
    <section className='books-container'>
      {books.map((books) => (
        <BooksPreview key={books.id} books={books} />
      ))}
    </section>
  )
}
