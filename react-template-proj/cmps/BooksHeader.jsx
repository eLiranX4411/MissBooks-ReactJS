export function BooksHeader({ onSetPage }) {
  return (
    <header className='books-header full main-layout'>
      <section>
        <h1>Miss-Books App</h1>
        <nav className='books-nav'>
          <a onClick={() => onSetPage('home')} href='#'>
            Home
          </a>
          <a onClick={() => onSetPage('about')} href='#'>
            About
          </a>
          <a onClick={() => onSetPage('index')} href='#'>
            Index
          </a>
        </nav>
      </section>
    </header>
  )
}
