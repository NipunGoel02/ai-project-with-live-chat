import React from 'react'
import Approute from './routes/Approute'
import { UserProvider } from './context/user.context'
function App() {
  return (
    <UserProvider>
        <Approute />
    </UserProvider>
  
  )
}

export default App