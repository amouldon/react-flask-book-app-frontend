import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonCircle, LockFill, EnvelopeFill } from 'react-bootstrap-icons'
import { BooksContext } from '../../context/BooksContext'
import { toast } from 'react-toastify'


const AuthForm = ({inputType, placeholder, idValue, icon, formFunction}) => {
  return (
    <div className="form-group my-3">
              {icon}
              <input
                type={inputType}
                className="form-control p-1 my-1"
                placeholder={placeholder}
                id={idValue}
                onChange={formFunction}
                />
            </div>
  )
}

export default AuthForm