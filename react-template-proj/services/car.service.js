import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'carDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const carService = {
  query,
  get,
  remove,
  save,
  getEmptyCar,
  getNextCarId,
  getFilterBy,
  setFilterBy,
}

function query() {
  return storageService.query(CAR_KEY).then((cars) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      cars = cars.filter((car) => regex.test(car.vendor))
    }
    if (gFilterBy.minSpeed) {
      cars = cars.filter((car) => car.maxSpeed >= gFilterBy.minSpeed)
    }
    return cars
  })
}

function get(carId) {
  return storageService.get(CAR_KEY, carId)
}

function remove(carId) {
  return storageService.remove(CAR_KEY, carId)
}

function save(car) {
  if (car.id) {
    return storageService.put(CAR_KEY, car)
  } else {
    return storageService.post(CAR_KEY, car)
  }
}

// function getEmptyCar(vendor = '', maxSpeed = 0) {
//   return { id: '', vendor, maxSpeed }
// }

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

function getNextCarId(carId) {
  return storageService.query(CAR_KEY).then((cars) => {
    let nextCarIdx = cars.findIndex((car) => car.id === carId) + 1
    if (nextCarIdx === cars.length) nextCarIdx = 0
    return cars[nextCarIdx].id
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
  console.log('books', books)
}

// function _createBook(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
