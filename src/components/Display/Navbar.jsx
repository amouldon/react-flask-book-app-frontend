import navBrandIcon from '../../assets/images/download.png'
import { useContext, useEffect } from 'react'
import  {useGetAuth}  from '../../hooks/UseGetAuth'
import { BooksContext } from '../../context/BooksContext'
import { NavLink, Link} from 'react-router-dom'


const Navbar = () => {
  const {currentUserInfo} = useGetAuth()
  const {logOut} = useContext(BooksContext)


  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      <Link to="/" className="navbar-brand ms-5"> <img src={navBrandIcon} className='py-0' alt="book" id='brand' /> </Link>
      <button className="navbar-toggler" type='button' data-bs-target='#toggler' data-bs-toggle='collapse'>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-auto" id='toggler'>
        <ul className="navbar-nav ms-auto me-5 ">
          <li className="nav-item">
            <NavLink to='/' className='nav-link px-3'> Home </NavLink>
          </li>
          {currentUserInfo.loggedInStatus ? 
          <>
          <li className="nav-item">
            <NavLink to='/add-book'className='nav-link px-2'> Browse </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/view-collection' className='nav-link px-2'> My collection </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/account' className='px-2 nav-link'> Account </NavLink>
          </li>
          <li className="nav-item">
            <Link to='/' className='nav-link px-2' onClick={logOut}> Logout </Link>
          </li>
          </> : <>
          <li className="nav-item">
            <NavLink to='/sign-in'className='nav-link px-2'> Sign in </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to='/sign-up'className='nav-link px-2'> Sign up </NavLink>
          </li>
          </> }
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar