import {useState, useContext} from 'react'
import { toast } from 'react-toastify'
import {BooksContext} from '../../context/BooksContext'
import RatingButtons from '../Display/RatingButtons'


const NewModal = ({book, index}) => {

    const {saveToCollection, books, setBooks, futureRead, inProgress, completionStatus, onChangeComplete, onChangeFuture, onChangeProgress} = useContext(BooksContext)
    const [userRating, setUserRating] = useState('Not rated')



    const onSubmit = async (e) => {
        e.preventDefault()
        let status
        if(completionStatus){status = 'Completed'}
        else if(inProgress){status = 'In progress'}
        else if(futureRead) {status = 'Plan to read'}
        if(status){
            const response = await saveToCollection(book, status, userRating)
             if (response.message === 'this book is already in your collection'){
                toast.error('This book is already in your collection')
            } else {
                toast.success(`${response.title} was added to your collection`)
            } 
        } else {
            console.log('failed')
        }}

    const onClickRating = (e) => {
        setUserRating(e.target.innerHTML)
    }

  return (
    <div className="modal fade" id={`searchModal${index}`} >
        <div className="modal-dialog">
            <div className="modal-content mx-5">
                <div className="modal-header">
                    <h4 className="modal-title">{book.volumeInfo.title}</h4>
                    <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                <div id={`searchModalText${index}`}>
                    {completionStatus ?
                    <h5>Completed</h5>
                    : inProgress ?
                    <h5>In progress</h5>
                    : futureRead ?
                    <h5>Plan to read</h5>
                    : ''}
                    <span className="small">{`Average rating: ${book.volumeInfo.averageRating * 2}`}</span>
                </div>
                <button className='btn btn-secondary m-2' onClick={onChangeFuture}>Add to future reads</button>
                <button className="btn btn-primary m-2" onClick={onChangeProgress}>In Progress</button>
                <button className="btn btn-success m-2" onClick={onChangeComplete}>Completed</button>
                {completionStatus && 
                <RatingButtons onClickRating={onClickRating}/>}
                </div>
                <div className="modal-footer">
                    <form onSubmit={onSubmit} > 
                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default NewModal