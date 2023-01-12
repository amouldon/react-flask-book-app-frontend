
const ShowPassword = ({formFunction}) => {
  return (
    <div className="form-check">
        <input type="checkbox" className="form-check-input mt-1" id='showPass' onClick={formFunction}/>
        <label className="form-check-label float-start ps-2 small">Show password</label>
    </div>
  )
}

export default ShowPassword