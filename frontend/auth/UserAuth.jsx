import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../src/context/user.context'
import { useState } from 'react'
import { navigate } from 'react-router-dom'
function UserAuth() {

    const { user } = useContext(UserContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem('token');
    if(!user){
        setIsAuthenticated(false)
        return null;  // return early if user is not authenticated yet
    }
     if(isAuthenticated){
         localStorage.removeItem('token');
         setIsAuthenticated(false);
         return null;  // return early if user is authenticated and then logged out, to avoid unnecessary re-renders and state changes.
     }
    useEffect(() => {
        if (!token) {
             navigate('/login')}
       if(!user){
        navigate('/login')
       }
    }, [])

    if (isAuthenticated) {
        return <div>Welcome {user.name}!</div>
    } else {
        return <div>Please log in.</div>
    }
  return (
    <>
    </>
  )
}

export default UserAuth
