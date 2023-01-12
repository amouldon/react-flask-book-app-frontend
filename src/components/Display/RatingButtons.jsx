

const RatingButtons = ({onClickRating}) => {
  return (
    <div className='d-flex justify-content-around' onClick={onClickRating}>
    <button className="btn btn-circle" id='setUserRating' style={{backgroundColor:'crimson'}}>1</button> 
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'crimson'}}>2</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'gold'}}>3</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'lightgray'}}>4</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'lightgray'}}>5</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'lightgreen'}}>6</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'lightgreen'}}>7</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'green'}}>8</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'green'}}>9</button>
    <button className="btn btn-circle" id='setUserRating'style={{backgroundColor:'green'}}>10</button>
    </div>
  )
}

export default RatingButtons