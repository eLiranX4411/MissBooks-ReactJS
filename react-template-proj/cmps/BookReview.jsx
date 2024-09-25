export function BookReview() {
  return (
    <section className='review-container'>
      <h2>Reviews:</h2>
      <h3 className='review-fullname'>Full Name: Dannie</h3>
      <select name='review-rating' id=''>
        <option value='rating'>Add Rating</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
      <h3 className='read-at'>Read at:</h3>
    </section>
  )
}
