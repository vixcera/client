import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

import Main from "./src/pages/main"
import Login from "./src/pages/login"
import Context from "./utils/context"
import Loading from "./utils/loading"
import Register from "./src/pages/register"

const Routing = () => {

  const token = localStorage.getItem('token') 
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [userid, setUserid] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (token) {
    const user = jwt_decode(token)
    {(user.username) && setUserid(user.username)}
    {(user.email) && setUserid(user.email)}
    {(user.id) && setUserid(user.id)}
    }
  }, [token])

  const valueContext = 
  {
      userid : userid,
      username : username,
      email : email,
      setLoading : setLoading,
      loading : loading,
  }

  if (loading) { return (<Loading/>)}

  return (
    <Context.Provider value={valueContext}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/support" element={<Main/>}/>
          <Route path="/pricing" element={<Main/>}/>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default Routing
