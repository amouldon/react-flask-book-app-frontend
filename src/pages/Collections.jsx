
import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext'
import BookCollection  from '../components/Books/BookCollection'
import  BookListSearch  from '../components/Books/BookListSearch'
import Spinner from '../components/Display/Spinner'


const CollectionBase = ({title, filter}) => {
    const {books, fetchBooks, isLoading} = useContext(BooksContext)
    const navigate = useNavigate()

    useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    token ? fetchBooks(token, filter) : navigate('/sign-in')} , [])  

    if(isLoading){return (<Spinner />)}
    else{
    return (
      <div className="color height py-4" style={{minWidth: 200}}>
        <div className="d-flex pb-4">
          <h2 className='ps-3'>{title}</h2>
            <Link to='/add-book' type='button' className="btn btn-primary px-3 pt-2 mb-1 ms-auto me-5"> Add a new book</Link>
        </div>
        {!books ? <h1 className='text-center'>No books</h1>
        :
        <div className="d-flex flex-column mx-3 pt-3 transparentBg">
          <div className="d-flex justify-content-evenly flex-wrap w-100 paddingBot">
            {books.map((book, index) => (
              <BookCollection key={index} book={book} index={index} />
            ))}
          </div>
        </div>
        }
      </div>
    ) 
  }}
export default CollectionBase