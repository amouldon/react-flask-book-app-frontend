import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'

export const useGetAuth = () => {
    const [ currentUserInfo, setCurrentUserInfo ] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus'))
        if(loggedInStatus){
            const token = JSON.parse(localStorage.getItem('token'))
            const email = JSON.parse(localStorage.getItem('email'))
            const name = JSON.parse(localStorage.getItem('name'))
            const password = JSON.parse(localStorage.getItem('password'))
            setCurrentUserInfo({loggedInStatus, token, email, name, password})
        }
        }, [navigate])
    return {currentUserInfo}
}

