import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonCircle, LockFill, EnvelopeFill } from 'react-bootstrap-icons'
import { BooksContext } from '../context/BooksContext'
import { toast } from 'react-toastify'
import AuthForm from '../components/Forms/AuthForm'
import ShowPassword from '../components/Forms/ShowPassword'


const SignUp = () => {
      const { postSignUp} = useContext(BooksContext)
      const [formData, setFormData] = useState({
        name: '',
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

        const response = await postSignUp(formData)
        console.log(response)
        const loggedInStatus = await JSON.parse(localStorage.getItem('loggedInStatus'))
        if(loggedInStatus){
          toast.success('You have successfully made an account')
          navigate('/')
        } else if (response.message === 'User taken'){
            toast.error('Email is already in use') 
        } else {
          toast.error('Invalid input')
        }
       }
   
  return (
    <div className='d-flex justify-content-center text-center'>
        <div className="mt-5 py-3 px-5 border border-3 rounded" style={{width:700}}>
          <h1>Create an account</h1>
          <form onSubmit={onSubmit}>
            <AuthForm inputType='text' icon={<PersonCircle/>} idValue='name' formFunction={onChange} placeholder='Name' />
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

export default SignUp