import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BooksIndex } from './pages/BooksIndex.jsx'
import { BooksHeader } from './cmps/BooksHeader.jsx'

const { useState, useEffect, useRef } = React

export function App() {
  const [page, setPage] = useState('index')

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <section className='app'>
      <BooksHeader onSetPage={onSetPage} />
      <main className='container'>
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'index' && <BooksIndex />}
      </main>
    </section>
  )
}
