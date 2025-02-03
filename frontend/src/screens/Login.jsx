import React, {useState, useContext}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const navigate = useNavigate();
     const {setUser  } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users/login',{
        email,
        password
        }).then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);

            navigate('/')

    }) 
   
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (

    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2" htmlFor="email">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-gray-700 p-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2" htmlFor="password">Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-gray-700 p-2 rounded-lg w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <p className="text-white mt-4">
          Don't have an account?{' '}
          <button
            onClick={handleCreateAccount}
            className="text-blue-500 hover:text-blue-700"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;