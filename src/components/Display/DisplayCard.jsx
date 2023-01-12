import { Link, useNavigate } from 'react-router-dom'

const DisplayCard = ({text, image, fontColor, link, count}) => {
  return (
      <div className="card hide-bottom d-inline-block" style={{width: 220}}>
        <div className='card-body text-center'>
          <Link to={link} className={`no-underline ${fontColor}`}>
            <h3>{text}</h3>
            <p className='text-dark'>{`${count} books`}</p>
          </Link>
        </div>
        <div className='hide-bottom'>
          <img className="card-img-top pb-3" src={image}/>
        </div>
      </div>
        

    
    
    
  )
}

export default DisplayCard