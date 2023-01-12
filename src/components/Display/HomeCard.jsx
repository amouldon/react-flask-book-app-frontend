

const HomeCard = ({image, text}) => {
  return (
    <div className="card card-sm">
        <img className="card-img-top card-wide" src={image} style={{maxHeight:200}}/>
        <div className="card-body card-wide">
            <p className="card-text">{text}</p>
        </div>
    </div>
  )
}

export default HomeCard