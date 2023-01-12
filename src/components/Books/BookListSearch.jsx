import { useState, useContext } from 'react'
import { Toggle2Off } from 'react-bootstrap-icons'
import defaultImage from '../../assets/images/images.png'
import SearchModal from '../Modals/SearchModal'
import BooksContext from '../../context/BooksContext'
import Datetime from 'react-datetime'

const BookListSearch = ({book, index}) => {
  const {bookInfoToggle, onClickInfo, onClickModal} = useContext(BooksContext)

    const displayImage = () => {
      if (bookInfoToggle === book.id){
         return <div className='staticSize bg-secondary' onClick={onClickInfo}>
            <p className="h5">{book.volumeInfo.authors}</p>
            <p> { book.volumeInfo.averageRating ? `Average rating: ${book.volumeInfo.averageRating * 2}` : 'Not yet rated'} </p> 
            <p className="small">{book.searchInfo.textSnippet === undefined ? 'No description provided': book.searchInfo.textSnippet}</p> 
         </div>
      } else {
        return <img onClick={onClickInfo} id={book.id} src={
          !book.volumeInfo || !book.volumeInfo.imageLinks ? defaultImage : `${book.volumeInfo.imageLinks.thumbnail}`}
          className="card-img-top pb-3 staticSize"/>
      }
    }

    return (
      <div className="card text-center mx-1 mt-4" style={{width:200, height:350, backgroundColor: 'lightgray'}}>
      {displayImage()}
      <div className="card-body d-flex pt-0 flex-column align-items-center "  style={{height: 140, overflow:'auto'}}>
          <h6 className="card-title fst-italic pt-4">{book.volumeInfo.title}</h6>
          <a type='button' className="btn btn-primary btn-sm  mt-auto" data-bs-toggle='modal' href={`#searchModal${index}`} onClick={() => onClickModal(index)}>Save</a>
          <SearchModal book={book} index={index} />
      </div>   
    </div>
    )
  }
  
  export default BookListSearch