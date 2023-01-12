import bookRating from '../assets/images/bookrating.png'
import stackBooks from '../assets/images/stackbooks.jpg'
import bookFriends from '../assets/images/bookfriends.jpg'
import HomeButton from '../components/Display/HomeButtons'
import HomeCard from '../components/Display/HomeCard'


const Home = () => {
    const loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus'))

    return (
      <div className="row height">
        <div className="col" id='homeBg'>
        {!loggedInStatus ? 
            <div className="d-flex flex-column justify-content-center h-100 align-items-center">
                <HomeButton link='/sign-in' text='Sign In' />
                <HomeButton link='/sign-up' text='Sign Up' />
            </div>
        :
            <div className="d-flex flex-column justify-content-center align-items-center h-100 my-auto pt-3">
                <HomeButton link='/add-book' text='Browse' />
                <HomeButton link='/view-collection' text='My collection' />
            </div>
             }
        </div>
        <div className="bg-secondary col">
            <p className="display-1 mt-5 mb-5 text-center text-white-50">Book Tracker</p>
            <div className="d-flex flex-md-row flex-column justify-content-around align-content-center">  
                <HomeCard image={stackBooks} text='Keep track of all the books you have read and plan to read' />
                <HomeCard image={bookRating} text='Rate all your reads' />
                <HomeCard image={bookFriends} text='Search for your next reading adventure' />
            </div>    
        </div>
      </div>
    )
  }
  
  export default Home