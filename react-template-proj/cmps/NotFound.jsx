const { Link } = ReactRouterDOM

export function NotFound() {
  return (
    <section className='not-found'>
      <h1>We are sorry!</h1>
      <h2>This page does not exist</h2>
      <button>
        <Link to='/'>Back</Link>
      </button>
    </section>
  )
}
