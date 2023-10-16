import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

import Main from "../src/pages/main"
import User from "../src/pages/user"
import Login from "../src/pages/login"
import Context from "../utils/context"
import Loading from "../utils/loading"
import Register from "../src/pages/register"

const Routing = () => {

  const axtoken = axios.create()

  const [id, setId] = useState('')
  const [img, setImg] = useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [expires, setExpires] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  axtoken.interceptors.request.use(async (config) => {
    const current = new Date().getTime()
    if (expires * 1000 < current) {
      const response = await axios.get('http://localhost:1010/reftoken',{withCredentials: true})
      setToken(response.data.token)}
      config.headers.Authorization = `bearer ${token}`
      return config
  }, (error) => { return Promise.reject(error) })

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      setId(decoded.id)
      setImg(decoded.img)
      setEmail(decoded.email)
      setExpires(decoded.exp)
      setUsername(decoded.username)
    } 
  }, [token])

  useEffect(() => {
    axios.get('http://localhost:1010/reftoken', { withCredentials: true })
    .then((response) => setToken(response.data.token))
  }, [])

  if (loading) return (<Loading/>)
  const context = {id, img, email, username, token, setLoading, setToken, axtoken}

  return (
    <Context.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/user" element={<User/>}/>
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
