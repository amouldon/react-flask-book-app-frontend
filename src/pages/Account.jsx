import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { BooksContext } from '../context/BooksContext'
import ProfileCard from '../components/Display/ProfileCard'



const Account =  () => {

    useEffect(() => {
      setFormData({
        name: localName,
        email: localEmail,
        password: localPassword
      }) 
    }, [])

    const localName = JSON.parse(localStorage.getItem('name'))
    const localEmail = JSON.parse(localStorage.getItem('email'))
    const localPassword = JSON.parse(localStorage.getItem('password'))
    const {updateProfile} = useContext(BooksContext)
    const [editProfile, setEditProfile] = useState(false)
    const [formData, setFormData] = useState({
      name: localName,
      email: localEmail,
      password: localPassword,
    })

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
    }

    const onClickEdit = () => {
      setEditProfile((prevState) => (
        !prevState
      ))
    }

    const onSubmit = async (e) =>{
      e.preventDefault()
      const response = await updateProfile(formData)
      if (response.message === 'email already in use') {
        toast.error('This email is taken')
      }
      else if (response.message === 'invalid') {
        toast.error('Invalid input')
      } else{
        toast.success('Profile updated')
        onClickEdit()
      }
    }

  return (
    <div className= ' height color'>
      <form className=' '>
        <div className="container-sm d-flex flex-column align-items-center pt-1">
          <h2>
            Profile details
          </h2>
          <ProfileCard label='Name' onChange={onChange} id='name' defaultValue={formData.name} editProfile={editProfile} />
          <ProfileCard label='Email' onChange={onChange} id='email' defaultValue={formData.email} editProfile={editProfile} />
          <ProfileCard label='Password' onChange={onChange} id='password' defaultValue={formData.password} editProfile={editProfile} />
          {editProfile ?
          <div className='d-flex'>
            <button className='btn btn-success py-2 mt-2 me-3' onClick={onSubmit}>Save changes</button>
            <button className='btn btn-danger py-2 mt-2 ms-3'onClick={setFormData}>Undo changes</button>
          </div>
          :
          <button className="btn btn-primary py-2 mt-2 w-25" onClick={onClickEdit}>Edit profile</button>
          }
        </div>
      </form>
    </div>

)}

export default Account