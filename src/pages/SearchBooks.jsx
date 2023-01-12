import { useState, useContext, useEffect } from "react"
import { BooksContext } from '../context/BooksContext'
import SearchForm from '../components/Forms/SearchForm'
import BookListSearch from "../components/Books/BookListSearch"
import Spinner from "../components/Display/Spinner"

const NewBook = () => {
    const [searchBook, setSearchBook] = useState('')
    const {onSubmitSearch, resultBooks, setResultBooks, isLoading, setIsLoading} = useContext(BooksContext)

     useEffect(() => {
        setResultBooks(null)
        setIsLoading(false)
    }, []) 

    const onChangeSearch = (e) => {
        setSearchBook(e.target.value)
    }

  if(isLoading){return (<Spinner />)}
  else{
  return (
    <div className="container-fluid height pb-4">
        <h1 className='pt-4 ps-3'>Find a book</h1>
        <SearchForm searchBook={searchBook} submitFunction={onSubmitSearch} changeFunction={onChangeSearch} />
        {resultBooks ?
        <div className="d-flex flex-column mx-3 pt-3 transparentBg paddingBot">
          <div className="d-flex justify-content-evenly flex-wrap w-100" id='paddingBot' >
            {resultBooks.map((book, index) => (
              <BookListSearch key={index} book={book} index={index} />
            ))}
          </div>
        </div>
        : ''}
    </div>
  )
}
}
export default NewBook