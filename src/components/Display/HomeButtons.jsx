import {Link, Routes, Route, BrowserRouter as Router} from 'react-router-dom'

const HomeButtons = ({link, text}) => {
  return (
    <Link to={link} className="btn btn-primary btn-lg small-btn large-btn mb-5" type='button' >
       <span className="h3"> {text}</span> 
    </Link>
  )
}

export default HomeButtons