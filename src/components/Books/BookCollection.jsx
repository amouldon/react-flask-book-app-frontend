import { useEffect, useState, useContext } from 'react'
import { BooksContext } from '../../context/BooksContext'
import { Toggle2Off } from 'react-bootstrap-icons'
import defaultImage from '../../assets/images/images.png'
import CollectionModal from '../Modals/CollectionModal'
import { PencilSquare } from 'react-bootstrap-icons'

const Book2 = ({book, index,}) => {
    const {bookInfoToggle, onClickInfo, onClickModal} = useContext(BooksContext)

    const convertDate = () => {
        let converted = []
        converted.push(book.date_holder.slice(8,10))
        converted.push(book.date_holder.slice(5,7))
        converted.push(book.date_holder.slice(2 ,4))
        converted.forEach((item) => {
            if(item[0] == 0){
                item = item.slice(1,2)
            }
        })
        converted = converted.join('/')
        console.log(converted)
        return converted
    }

    const displayImage = () => {        
        if (bookInfoToggle == book.id) {
            return <div className='staticSize bg-secondary pt-3' onClick={onClickInfo}>
            <p className="h5 pt-3">{book.author}</p>
            <p> {book.collection_status == 'Completed' && `My rating: ${book.user_rating}`}</p>
            <p>{book.average_rating  && `Average rating: ${book.average_rating}`}</p> 
            <p>Added on {convertDate(book.date_holder)}</p>
            <p>{book.collection_status == 'Completed' && `Completed on ${convertDate(book.date_holder)}`}</p>
         </div>
        } else {
            return <img onClick={onClickInfo} id={book.id} src={
            book.image_url}
            className="card-img-top pb-3 staticSize "/>
         }
        }
    
    const collectionStatusClass = () => {
        if(book.collection_status == 'Completed'){return 'card-text h5 text-success'}
        else if (book.collection_status == 'In progress'){return 'card-text h5 text-primary'}
        else {return 'card-text h5 text-secondary'}
    }

  return (
    <div className="card text-center mx-1 mt-4 " style={{width:200, height:350, backgroundColor: 'lightgray'}}>
        {displayImage()}
        <div className="card-body pt-2"  style={{height: 140, overflow:'auto'}}>
            <PencilSquare className='float-end h4 text-info hover' data-bs-toggle='modal' href={`#collectionModal${index}`} onClick={() => onClickModal(book)}/>
            <p className={collectionStatusClass()}>{book.collection_status}</p>
            <h5 className="card-title fst-italic px-1">{book.title}</h5>
            <CollectionModal book={book} index={index}/>
        </div>
    </div>
  )
}

export default Book2

