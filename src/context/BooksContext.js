import { useState, useEffect,  createContext } from 'react'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([])
    const [resultBooks, setResultBooks] = useState([])
    const [filter, setFilter] = useState([''])
    const [isLoading, setIsLoading] = useState(true)
    const [completionStatus, setCompletionStatus] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [futureRead, setFutureRead] = useState(false)
    const [bookInfoToggle, setBookInfoToggle] = useState({
        status: false,
        id: ''
      })
    const onClickModal = (book) => {
      setInProgress()
      setCompletionStatus()
      setFutureRead()
      console.log(book)
      {book.collection_status == 'Completed' && setCompletionStatus(true)}
      {book.collection_status == 'In progress' && setInProgress(true)}
      {book.collection_status == 'Plan to read' && setFutureRead(true)}
    }
    const onChangeComplete = () => {
      setInProgress(false)
      setFutureRead(false)
      setCompletionStatus(true)
    }

    const onChangeProgress = () => {
        setInProgress(true)
        setFutureRead(false)
        setCompletionStatus(false)
    }

    const onChangeFuture = () => {
        setInProgress(false)
        setFutureRead(true)
        setCompletionStatus(false)
    }


      const fetchBooks = async (token, filter) => {
        const response = await fetch('http://127.0.0.1:5000/api/view_books', {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'filter': filter})
        })
        const data = await response.json()
        if (data.message == 'no books found'){
          setBooks('')
        }
        else{
          console.log(data)
          setBooks(data)}
          setIsLoading(false)
      }

    const postSignUp = async (userCredentials) => {
      const response = await fetch('http://127.0.0.1:5000/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      })
      const data = await response.json()
      console.log(data)
      if (data.token){
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('name', JSON.stringify(data.name))
        localStorage.setItem('email', JSON.stringify(data.email))
        localStorage.setItem('id', JSON.stringify(data.id))
        localStorage.setItem('password', JSON.stringify(data.password))
        localStorage.setItem('loggedInStatus', JSON.stringify(true))
        return data
      } else {
        return data
      }
    }

    const postSignIn = async (userCredentials) => {
      const response = await fetch('http://127.0.0.1:5000/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      })
      const data = await response.json()
      console.log(data)
      if(data.token){
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('name', JSON.stringify(data.name))
        localStorage.setItem('email', JSON.stringify(data.email))
        localStorage.setItem('id', JSON.stringify(data.id))
        localStorage.setItem('password', JSON.stringify(data.password))
        localStorage.setItem('loggedInStatus', JSON.stringify(true))
      }
    }

    const editBookStatus = async (book, userCompletionStatus, userRating) => {
      const bookData = {user_rating: userRating, collection_status: userCompletionStatus }
      const token = JSON.parse(localStorage.getItem('token'))
      const response = await fetch(`http://127.0.0.1:5000/api/update_book/${book.id}`, {
        method: 'PATCH',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      })
      const data = await response.json()
      setBooks(books.map((book) => (book.id === data.id ? data : book)))
    }

    const deleteBook = async (id) => {
      const token = JSON.parse(localStorage.getItem('token'))
      const response = await fetch(`http://127.0.0.1:5000/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        }        
      })
      const data = await response.json()
      setBooks(books.filter((book) => book.id != id))
    }

    const updateProfile = async (userDetails) => {
      const token = await JSON.parse(localStorage.getItem('token'))
      const response = await fetch('http://127.0.0.1:5000/api/update_profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(userDetails)
      })
      const data = await response.json()
      if (data.name) {localStorage.setItem('name', JSON.stringify(data.name))}
      if (data.email) {localStorage.setItem('email', JSON.stringify(data.email))}
      if (data.password) {localStorage.setItem('password', JSON.stringify(data.password))}
      return data
    }

    const onSubmitSearch = async (e, searchBook) => {
      e.preventDefault()
      setIsLoading(true)
      const reformatted = searchBook.split(' ').join('+')
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${reformatted}`)
      const data = await response.json()
      console.log(data.items)
      setResultBooks(data.items)
      setIsLoading(false)
  }

     const saveToCollection = async (book, userData, userRating) => {
      const bookData = {author: book.volumeInfo.authors, title: book.volumeInfo.title, average_rating: book.volumeInfo.averageRating * 2, user_rating: userRating, image_url: book.volumeInfo.imageLinks.thumbnail, collection_status: userData}
      const token =  await JSON.parse(localStorage.getItem('token'))
      const response = await fetch('http://127.0.0.1:5000/api/add_book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(bookData)
      })
      const data = await response.json()
      console.log(data)
      return data
    } 


    const logOut = () => {
      localStorage.clear()
      window.location.reload()
    }

    const onClickInfo = (e) => {
      setBookInfoToggle(e.target.id)
      }


  return (
    <BooksContext.Provider 
    value={{
      books,
      setBooks,
      fetchBooks,
      postSignUp,
      postSignIn,
      logOut,
      editBookStatus,
      deleteBook,
      updateProfile,
      saveToCollection,
      isLoading,
      setIsLoading,
      filter,
      setFilter,
      futureRead,
      inProgress, 
      completionStatus, 
      setFutureRead, 
      setInProgress, 
      setCompletionStatus,
      bookInfoToggle, 
      setBookInfoToggle,
      onClickInfo,
      onClickModal,
      onChangeComplete,
      onChangeProgress,
      onChangeFuture,
      onSubmitSearch,
      resultBooks, 
      setResultBooks,
    }}
    >
      {children}
    </BooksContext.Provider>
  )
}

export default BooksContext
