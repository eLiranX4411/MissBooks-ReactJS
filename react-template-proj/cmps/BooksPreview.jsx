export function BooksPreview({ books }) {
  return (
    <div className='book-card'>
      <img className='thumbnail' src={`./assets/img/${books.thumbnail}`} alt='Book Thumbnail' />
      <h2 className='title'>{books.title}</h2>
      <h3 className='desc'>{books.description}</h3>
      <ul className='book-pricelist'>
        <li className='amount'>{books.listPrice.amount}</li>
        <li className='currency'>{books.listPrice.currencyCode}</li>
        <li className='onsale'>{books.listPrice.isOnSale}</li>
      </ul>
    </div>
  )
}
