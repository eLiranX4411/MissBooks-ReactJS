const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
// Pages
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BooksIndex } from './pages/BooksIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
// Cmps
import { BooksHeader } from './cmps/BooksHeader.jsx'
import { NotFound } from './cmps/NotFound.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <BooksHeader />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/book' element={<BooksIndex />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
