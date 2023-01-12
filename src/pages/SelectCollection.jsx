import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext'
import  BookListSearch  from '../components/Books/BookListSearch'
import DisplayCard from '../components/Display/DisplayCard'
import smallStackBooks from '../assets/images/stackbooks.jpg'
import bigStackBooks from '../assets/images/download.jpg'
import sitting from '../assets/images/girl.jpg'
import shelf from '../assets/images/shelf.jpg'
import clipboard from '../assets/images/clipboard.webp'
import Spinner from "../components/Display/Spinner"

 

const ChooseCollection =  () => {
  const navigate = useNavigate() 
  const [bookCount, setBookCount] = useState({
    allCount: 'Loading',
    completedCount: 'Loading',
    futureCount: 'Loading',
    progressCount: 'Loading'
  })
  const { allCount, completedCount, futureCount, progressCount } = bookCount

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    token ? fetchCount(token) : navigate('/sign-in')} , [])
  
 const fetchCount = async (token) => {
  const response = await fetch('http://127.0.0.1:5000/api/get_count', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
  const data = await response.json()
  setBookCount(data)
}

  return (
    <div className="color height pt-4">
      <div className="d-flex">
        <h2 className='ps-3'>My Collection</h2>
          <Link to='/add-book' type='button' className="btn btn-primary px-3 pt-2 mb-1 ms-auto me-5"> Search books</Link>
      </div>
        <div className="d-md-flex justify-content-around mt-5">
              <DisplayCard text='All books' fontColor='text-primary' link='/view-all' image={shelf} count={allCount}/>
              <DisplayCard text='Completed' fontColor='text-success' link='/view-completed' image={bigStackBooks} count={completedCount}/>
              <DisplayCard text='In progress' fontColor='text-warning' link='/view-in-progress' image={sitting} count={progressCount}/>
              <DisplayCard text='Future reads' fontColor='text-secondary' link='/view-hold' image={clipboard} count={futureCount}/>
        </div>
    </div>
  ) 
}


export default ChooseCollection