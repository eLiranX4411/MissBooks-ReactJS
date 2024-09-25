const { Link, NavLink, useNavigate } = ReactRouterDOM

export function BooksHeader() {
  return (
    <header className='books-header full main-layout'>
      <section>
        <h1>Miss-Books App</h1>
        <nav className='books-nav'>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/book'>Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
