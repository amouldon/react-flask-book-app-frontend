
import {Link, Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Display/Navbar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NewBook from './pages/SearchBooks'
import Account from './pages/Account'
import ChooseCollection from './pages/SelectCollection'
import { BooksProvider } from './context/BooksContext' 
import CollectionBase from './pages/Collections'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "react-datetime/css/react-datetime.css";

const App = () => {
  return (
    <BooksProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/account' element={<Account />} />
        <Route path='/view-collection' element={<ChooseCollection />} />
        <Route path='/add-book' element={<NewBook sourceType='Googlebooks'/>} />
        <Route path='/view-completed' element={<CollectionBase title='Completed books' filter='Completed' sourceType='Backend'/>} />
        <Route path='/view-all' element={<CollectionBase title='All books' filter='' link='/view-all' sourceType='Backend'/>} />
        <Route path='/view-in-progress' element={<CollectionBase title='In progress' filter='In progress' link='/view-in-progress' sourceType='Backend'/>} />
        <Route path='/view-hold' element={<CollectionBase title='Plan to read' filter='Plan to read' link='/view-hold' sourceType='Backend' />} />

      </Routes>
    </Router>
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </BooksProvider>
  )
}

export default App