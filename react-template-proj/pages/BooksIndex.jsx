const { useState, useEffect, useRef } = React

export function BooksIndex() {
  const [books, setBooks] = useState(null)

  return (
    <section>
      <h2>Welcome to Index Homepage !</h2>
      <h3>crudl</h3>
    </section>
  )
}
