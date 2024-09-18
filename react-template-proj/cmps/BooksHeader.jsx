export function BooksHeader({ onSetPage }) {
  const gLinks = [
    {
      title: 'Home',
      href: 'home'
    },
    {
      title: 'About',
      href: 'about'
    },
    {
      title: 'index',
      href: 'index'
    }
  ]

  return (
    <header className='books-header full main-layout'>
      <section>
        <h1>Miss-Books App</h1>
        <nav className='books-nav'>
          {gLinks.map((link, idx) => (
            <div key={idx} className='header-link'>
              <a onClick={() => onSetPage(link.href)} href='#'>
                {link.title}
              </a>
            </div>
          ))}
        </nav>
      </section>
    </header>
  )
}
