import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

import Main from "../src/pages/user/main"
import Login from "../src/pages/user/login"
import Context from "../utils/context"
import Order from "../src/pages/product/order"
import Profile from "../src/pages/user/profile"
import Create from "../src/pages/product/create"
import Details from "../src/pages/product/details"
import Product from "../src/pages/product/product"
import Register from "../src/pages/user/register"
import Wetails from "../admin/wetails"
import Dashboard from "../admin/dashboard"
import checkvxsrf from "../service/checkvxsrf"
import UserConfirm from "../src/pages/auth/userConfirm"
import SuccessOrder from "../src/pages/auth/successOrder"

const Routing = () => {

  const axtoken = axios.create()

  const [vid, setVid] = useState('')
  const [img, setImg] = useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [expires, setExpires] = useState('')
  const [username, setUsername] = useState('')

  axtoken.interceptors.request.use(async (config) => {
    const current = new Date().getTime()
    if (expires * 1000 < current) {
      const response = await axios.get(`${import.meta.env.VITE_API}/vxrft`)
      setToken(response.data.token)}
      config.headers.Authorization = `bearer ${token}`
      return config
  }, (error) => { return Promise.reject(error) })

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      setVid(decoded.vid)
      setImg(decoded.img)
      setEmail(decoded.email)
      setExpires(decoded.exp)
      setUsername(decoded.username)
      if (!decoded.img) setImg('/img/dui.jpg')
    } 
  }, [token])

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API}/vxrft`)
      .then((response) => setToken(response.data.token))
      .then(() => checkvxsrf())
      .catch((error) => {console.log(error.message)})
  }, [])

  const context = {vid, img, email, username, token, setToken, axtoken}

  return (
    <Context.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/product/:ctg" element={<Product/>}/>
          <Route path="/order/:vid" element={<Order/>}/>
          <Route path="/products" element={<Main/>}/>
          <Route path="/about" element={<Main/>}/>
          
          <Route path="/product/details/:vid" element={<Details/>}/>
          <Route path="/waiting/details/:vid" element={<Wetails/>}/>
          <Route path="/confirm/user/:token" element={<UserConfirm/>}/>

          <Route path="/transaction/success" element={<SuccessOrder/>}/>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default Routing
