import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getFilterBy,
  setFilterBy,
}

let books = [
  {
    id: 'OXeMG8wNskc',
    title: 'metus hendrerit',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'OXBaG8wNskc',
    title: 'metus 2',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/15.jpg',
    listPrice: {
      amount: 222,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'OXeMG8eGskc',
    title: 'metus 3',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 193,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
]

function query() {
  return new Promise((reslove, reject) => {
    return reslove(books)
  })
}

// function query() {
//   // return storageService.query(BOOK_KEY).then((books) => {
//   //   if (gFilterBy.txt) {
//   //     const regex = new RegExp(gFilterBy.txt, 'i')
//   //     books = books.filter((book) => regex.test(book.vendor))
//   //   }
//   //   if (gFilterBy.minSpeed) {
//   //     books = books.filter((book) => book.maxSpeed >= gFilterBy.minSpeed)
//   //   }
//   //   return books
//   // })
// }

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
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

function getEmptyBook(vendor = '', maxSpeed = 0) {
  return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextCarIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextCarIdx === books.length) nextCarIdx = 0
    return books[nextCarIdx].id
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
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    }
    books.push(book)
  }
  // console.log('books', books)
}

// function _createBook(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
