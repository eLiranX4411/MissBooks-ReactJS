import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

// const GOOGLE_BOOK_KEY = 'googleBookDB'
// var gCache = utilService.loadFromStorage(GOOGLE_BOOK_KEY) || {}
// var gFilterBy = { title: '', price: 0 }

export const bookService = {
  query,
  get,
  remove,
  save,
  getFilterBy,
  setFilterBy,
  getNextBookId,
  getDefaultFilter,
  getDefaultBook,
  addReview,
  getDefaultReview,
  getGoogleBookData,
  addGoogleBook
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (!books || !books.length) {
      _createBooks()
      // books = utilService.loadFromStorage(BOOK_KEY)
    }

    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regex.test(book.title))
    }

    if (filterBy.price) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.price)
    }

    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => _setNextPrevBookId(book))
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function addReview(bookId, review) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)

    return bookService.save(book)
  })
}

function getDefaultFilter() {
  return { title: '', price: 0 }
}

function getDefaultReview() {
  return { name: '', rating: '', readAt: Date.now() }
}

function getDefaultBook() {
  return { title: '', amount: 0, isOnSale: false, pageCount: 0, authors: '' }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7
      }
    }
    books.push(book)
  }
  utilService.saveToStorage(BOOK_KEY, books)
}

function getGoogleBookData(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`

  return axios.get(url).then((res) => {
    const firstFiveBooks = res.data.items.slice(0, 5)
    return firstFiveBooks.map((book) => {
      const volumeInfo = book.volumeInfo
      const googleBookId = book.id
      return {
        title: volumeInfo.title,
        id: googleBookId
      }
    })
  })
}

function addGoogleBook(item) {
  return storageService.query(BOOK_KEY).then((books) => {
    const existingBook = books.find((book) => book.title === item.title || book.id === item.id)
    if (existingBook) {
      return Promise.reject('Book already exists in the database')
    }

    return storageService.post(BOOK_KEY, item)
  })
}
