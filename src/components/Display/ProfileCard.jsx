import ShowPassword from '../Forms/ShowPassword'
import { useState } from 'react'

const ProfileCard = ({label, defaultValue, onChange, id, editProfile }) => {
  const [hidePassword, setHidePassword] = useState(true)

  const onClickPassword = () => {
    setHidePassword((prevState) => (
      !prevState
    ))
  }


  return (
  <div className='card border border-3 border-dark rounded py-3 px-4 mt-1 mb-2 w-50'>
    <span className='text-center h5'>{label}</span> 
    {editProfile ? 
    <input className='ps-2 form-control showPass' type={`${hidePassword && label === 'Password' ? 'password' : 'text'}`} id={id} defaultValue={defaultValue} onChange={onChange}/>
    : 
    <input readOnly type={`${hidePassword && label === 'Password' ? 'password' : 'text'}`} className='ps-2 form-control-plaintext showPass' defaultValue={defaultValue}  />}
    {label === 'Password' && <ShowPassword formFunction={onClickPassword}/>}
  </div>
  
)
}
export default ProfileCard
