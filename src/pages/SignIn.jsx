import { useState, useContext } from 'react'
import { BooksContext } from '../context/BooksContext'
import { useNavigate } from 'react-router-dom'
import { LockFill, EnvelopeFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'
import AuthForm from '../components/Forms/AuthForm'
import ShowPassword from '../components/Forms/ShowPassword'


const SignIn = () => {
    const { postSignIn, } = useContext(BooksContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }

    const onClick = () => {
      setShowPassword((checkStatus) => (
        !checkStatus
      ))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

          await postSignIn(formData)
          const loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus'))
          if(loggedInStatus == true){navigate('/')
          } else {
              toast.error('Invalid credentials') 
          }
    }
  return (
    <div className='d-flex justify-content-center text-center'>
        <div className="border border-5  mt-5 py-3 px-5 border border-3 rounded" style={{width:700}}>
          <h1>Sign in</h1>
          <form onSubmit={onSubmit}>
            <AuthForm inputType='text'
             placeholder='Email' icon={<EnvelopeFill />} idValue='email' formFunction={onChange} />
            <AuthForm inputType={showPassword ? 'text' : 'password'}
             placeholder='Password' idValue='password' formFunction={onChange} icon={<LockFill />} />
            <ShowPassword formFunction={onClick} />
            <button type='submit' className="btn btn-primary p-2">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default SignIn