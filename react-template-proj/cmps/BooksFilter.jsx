const { useState, useEffect, useRef } = React

export function BooksFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // console.log('field:', field)
    // console.log('value:', value)
  }

  const { title, price } = filterByToEdit

  function onClear(ev) {
    ev.preventDefault()
    filterByToEdit.title = ''
    filterByToEdit.price = 0
    onSetFilterBy(filterByToEdit)
  }

  return (
    <form onSubmit={onClear} className='books-filter'>
      <legend className='filter-card'>
        <h1 className='filter-title'>Filter By</h1>
        <label htmlFor='title-filter'>
          Title: <input value={title} onChange={handleChange} type='text' id='title-filter' name='title' />
        </label>
        <label htmlFor='price-filter'>
          Price: <input value={price || ''} onChange={handleChange} type='number' id='price-filter' name='price' />
        </label>
        <button>Clear</button>
      </legend>
    </form>
  )
}
