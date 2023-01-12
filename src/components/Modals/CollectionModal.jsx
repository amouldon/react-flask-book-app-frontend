import {useState, useContext} from 'react'
import { toast } from 'react-toastify'
import {BooksContext} from '../../context/BooksContext'
import RatingButtons from '../Display/RatingButtons'



const CollectionModal = ({book, index}) => {
    const [userRating, setUserRating] = useState('Not rated')
    const {editBookStatus, deleteBook, futureRead, inProgress, completionStatus, onChangeComplete, onChangeFuture, onChangeProgress} = useContext(BooksContext)

    const onSubmit = (e) => {
        e.preventDefault()
        let status
        if(completionStatus){status = 'Completed'}
        else if(inProgress){status = 'In progress'}
        else if(futureRead){status = 'Plan to read'}
        if(status){ 
            editBookStatus(book, status, userRating)
        } else {
            console.log('failed')
        }}

    const onClickRating = (e) => {
        setUserRating(e.target.innerHTML)
    }

  return (
    <div className="modal fade" id={`collectionModal${index}`} >
        <div className="modal-dialog">
            <div className="modal-content mx-5">
                <div className="modal-header">
                    <h4 className="modal-title">{book.title}</h4>
                    <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <div id={`collectionModalText${index}`}>
                    {completionStatus ?
                    <h5>Completed</h5>
                    : inProgress ?
                    <h5>In progress</h5>
                    : futureRead ?
                    <h5>Plan to read</h5>
                    : ''}
                    <div className="">
                        <span className="small me-3">{`Average rating: ${book.average_rating}`}</span>
                        <span className="small ms-3">{book.user_rating ? `My rating: ${book.user_rating}` : ''}</span>
                    </div>
                </div>
                <button className='btn btn-secondary m-2' onClick={onChangeFuture}>Add to future reads</button>
                <button className="btn btn-primary m-2" onClick={onChangeProgress}>In Progress</button>
                <button className="btn btn-success m-2" onClick={onChangeComplete}>Completed</button>
                {completionStatus ? 
                <RatingButtons onClickRating={onClickRating}/>
                : ''}
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type='button' className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteBook(book.id)}>Remove Book</button>
                    <form onSubmit={onSubmit}>
                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default CollectionModal