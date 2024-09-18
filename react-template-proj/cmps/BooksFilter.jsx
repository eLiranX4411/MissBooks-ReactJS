export function BooksFilter() {
  return (
    <section className='books-filter'>
      <legend className='filter-card'>
        <h1 className='filter-title'>Filter By</h1>
        <label htmlFor='title-filter'>
          Title: <input type='text' id='title-filter' name='title-filter' />
        </label>
        <label htmlFor='price-filter'>
          Price: <input type='number' id='price-filter' name='price-filter' />
        </label>
      </legend>
    </section>
  )
}
