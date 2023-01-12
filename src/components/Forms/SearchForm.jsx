
const SearchForm = ({submitFunction, changeFunction, searchBook}) => {
  return (
    <form className='text-center' onSubmit={(e) => submitFunction(e, searchBook)}>
        <div className="form-group py-2 d-flex flex-column align-items-center">
            <input type="text" id='search' className="form-control form-control-lg w-50 ps-2" onChange={changeFunction}  placeholder='Enter title here'/>
            <button type='submit' className="btn btn-primary btn-lg m-3 py-1 px-5">Search</button>
        </div>
    </form>
  )
}

export default SearchForm